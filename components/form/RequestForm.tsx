'use client';

import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo, useRef, useState, type FormEvent } from 'react';
import { useForm, useWatch, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';

import {
  CONTACT_PREFERENCE_LABELS,
  CUSTOMER_TYPE_LABELS,
  OCCUPANCY_LABELS,
  TYPES_WITH_COMPANY,
  TYPES_WITH_PROPERTY_COUNT,
  URGENCY_LABELS,
  leadFormSchema,
  type LeadFormValues,
} from '@/lib/schemas/lead';
import { launchedDivisions, divisions as allDivisions } from '@/content/divisions';
import { company } from '@/content/company';
import { Field, inputClass } from '@/components/ui/Field';
import { Button } from '@/components/ui/Button';
import { Callout } from '@/components/ui/Callout';
import { Turnstile } from './Turnstile';
import { PhotoUpload, type UploadedPhoto } from './PhotoUpload';
import { trackLeadSubmitted } from '@/lib/analytics';
import { cn } from '@/lib/cn';

export interface RequestFormDefaults {
  customerType?: LeadFormValues['customerType'];
  divisions?: LeadFormValues['divisions'];
  /** Pre-written first line of the description, from a plan or audit CTA. */
  descriptionSeed?: string;
}

type FieldErrors = Partial<Record<string, string[]>>;

export function RequestForm({ defaults }: { defaults: RequestFormDefaults }) {
  const router = useRouter();
  const [turnstileToken, setTurnstileToken] = useState('');
  const [photos, setPhotos] = useState<UploadedPhoto[]>([]);
  const [serverError, setServerError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const errorSummaryRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    control,
    setError,
    setFocus,
    formState: { errors, isSubmitted },
  } = useForm<LeadFormValues>({
    resolver: zodResolver(leadFormSchema),
    mode: 'onTouched',
    defaultValues: {
      customerType: defaults.customerType ?? 'homeowner',
      propertyCount: 1,
      address: '',
      city: '',
      zip: '',
      yearBuilt: '' as unknown as number,
      occupancy: 'occupied',
      divisions: defaults.divisions ?? [],
      description: defaults.descriptionSeed ?? '',
      urgency: 'flexible',
      accessNotes: '',
      photoUrls: [],
      name: '',
      email: '',
      phone: '',
      contactPreference: 'phone',
      company: '',
      website: '',
    },
  });

  const customerType = useWatch({ control, name: 'customerType' });
  const showCompany = TYPES_WITH_COMPANY.includes(customerType);
  const showPropertyCount = TYPES_WITH_PROPERTY_COUNT.includes(customerType);

  const errorList = useMemo(
    () =>
      Object.entries(errors)
        .map(([name, err]) => ({ name, message: (err as { message?: string })?.message }))
        .filter((e): e is { name: string; message: string } => Boolean(e.message)),
    [errors],
  );

  // Focus moves to the first invalid field on submit.
  const onInvalid = useCallback(() => {
    const first = Object.keys(errors)[0] as keyof LeadFormValues | undefined;
    if (first) {
      try {
        setFocus(first, { shouldSelect: true });
      } catch {
        errorSummaryRef.current?.focus();
      }
    }
  }, [errors, setFocus]);

  useEffect(() => {
    if (isSubmitted && errorList.length > 0) {
      errorSummaryRef.current?.focus();
    }
    // Re-announce whenever the set of errors changes after a submit attempt.
  }, [isSubmitted, errorList.length]);

  const onValid = useCallback(
    async (values: LeadFormValues) => {
      setServerError(null);
      setSubmitting(true);

      try {
        const res = await fetch('/api/lead', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({
            ...values,
            photoUrls: photos.map((p) => p.url),
            turnstileToken: turnstileToken || 'turnstile-not-configured',
          }),
        });

        const data = (await res.json()) as {
          ok: boolean;
          reference?: string;
          priority?: 'priority' | 'standard';
          error?: string;
          fieldErrors?: FieldErrors;
        };

        if (!res.ok || !data.ok) {
          if (data.fieldErrors) {
            for (const [name, messages] of Object.entries(data.fieldErrors)) {
              if (messages?.[0]) {
                setError(name as keyof LeadFormValues, { type: 'server', message: messages[0] });
              }
            }
          }
          setServerError(data.error ?? 'Something went wrong. Please call us instead.');
          setSubmitting(false);
          errorSummaryRef.current?.focus();
          return;
        }

        trackLeadSubmitted(data.priority ?? 'standard');
        router.push(`/request/thanks?ref=${encodeURIComponent(data.reference ?? '')}`);
      } catch {
        setServerError(
          `We could not reach the server. Please call us on ${company.phone} — we do not want to lose your request.`,
        );
        setSubmitting(false);
        errorSummaryRef.current?.focus();
      }
    },
    [photos, turnstileToken, router, setError],
  );

  /**
   * `handleSubmit` is invoked inside the event handler rather than during
   * render, so the refs it closes over are never read while rendering.
   */
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    void handleSubmit(onValid, onInvalid)(event);
  };

  return (
    <form onSubmit={onSubmit} noValidate className="max-w-[46rem]">
      {/* Honeypot. Hidden from people, visible to naive bots. */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website">Website</label>
        <input id="website" type="text" tabIndex={-1} autoComplete="off" {...register('website')} />
      </div>

      {/* Live region: errors are announced, not just coloured. */}
      <div
        ref={errorSummaryRef}
        tabIndex={-1}
        role="alert"
        aria-live="assertive"
        className={cn(
          'scroll-mt-24 focus:outline-none',
          (errorList.length > 0 && isSubmitted) || serverError ? 'mb-6' : 'sr-only',
        )}
      >
        {serverError ? (
          <Callout variant="caution" title="We could not send that">
            {serverError}{' '}
            <a href={company.phoneHref}>
              {company.phone}
            </a>
          </Callout>
        ) : null}
        {isSubmitted && errorList.length > 0 ? (
          <Callout variant="caution" title={`${errorList.length} field(s) need attention`}>
            <ul className="mt-1 list-disc space-y-0.5 pl-4">
              {errorList.map((e) => (
                <li key={e.name}>{e.message}</li>
              ))}
            </ul>
          </Callout>
        ) : null}
      </div>

      {/* ── 1. Who are you? ─────────────────────────────────────────────── */}
      <FormSection index="1" title="Who are you?">
        <fieldset>
          <legend className="sr-only">Customer type</legend>
          <div className="grid gap-2 sm:grid-cols-2">
            {(Object.keys(CUSTOMER_TYPE_LABELS) as (keyof typeof CUSTOMER_TYPE_LABELS)[]).map(
              (value) => (
                <label
                  key={value}
                  className={cn(
                    'flex min-h-[2.75rem] cursor-pointer items-center gap-2.5 rounded-md border bg-paper-raised px-3 py-2.5 text-sm transition-colors',
                    customerType === value
                      ? 'border-2 border-soil bg-paper'
                      : 'hover:border-steel',
                  )}
                >
                  <input
                    type="radio"
                    value={value}
                    className="h-4 w-4 accent-[var(--soil)]"
                    {...register('customerType')}
                  />
                  <span className="text-soil">{CUSTOMER_TYPE_LABELS[value]}</span>
                </label>
              ),
            )}
          </div>
        </fieldset>

        {showCompany || showPropertyCount ? (
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {showCompany ? (
              <Field id="company" label="Company" optionalLabel error={errors.company?.message}>
                {({ id, describedBy, invalid }) => (
                  <input
                    id={id}
                    type="text"
                    autoComplete="organization"
                    aria-describedby={describedBy}
                    aria-invalid={invalid}
                    className={inputClass}
                    {...register('company')}
                  />
                )}
              </Field>
            ) : null}
            {showPropertyCount ? (
              <Field
                id="propertyCount"
                label="How many properties?"
                hint="Roughly is fine. It changes how we price and who picks this up."
                error={errors.propertyCount?.message}
                required
              >
                {({ id, describedBy, invalid }) => (
                  <input
                    id={id}
                    type="number"
                    inputMode="numeric"
                    min={1}
                    max={500}
                    aria-describedby={describedBy}
                    aria-invalid={invalid}
                    className={inputClass}
                    {...register('propertyCount')}
                  />
                )}
              </Field>
            ) : null}
          </div>
        ) : null}
      </FormSection>

      {/* ── 2. The property ─────────────────────────────────────────────── */}
      <FormSection index="2" title="The property">
        <Field id="address" label="Street address" error={errors.address?.message} required>
          {({ id, describedBy, invalid }) => (
            <input
              id={id}
              type="text"
              autoComplete="street-address"
              aria-describedby={describedBy}
              aria-invalid={invalid}
              className={inputClass}
              {...register('address')}
            />
          )}
        </Field>

        <div className="mt-4 grid gap-4 sm:grid-cols-[2fr_1fr]">
          <Field id="city" label="City" error={errors.city?.message} required>
            {({ id, describedBy, invalid }) => (
              <input
                id={id}
                type="text"
                autoComplete="address-level2"
                aria-describedby={describedBy}
                aria-invalid={invalid}
                className={inputClass}
                {...register('city')}
              />
            )}
          </Field>
          <Field id="zip" label="ZIP" error={errors.zip?.message} required>
            {({ id, describedBy, invalid }) => (
              <input
                id={id}
                type="text"
                inputMode="numeric"
                autoComplete="postal-code"
                maxLength={5}
                aria-describedby={describedBy}
                aria-invalid={invalid}
                className={inputClass}
                {...register('zip')}
              />
            )}
          </Field>
        </div>

        <Field
          id="yearBuilt"
          label="Year built"
          hint="Helps us apply the right safety rules for older homes. An approximate year is fine."
          error={errors.yearBuilt?.message}
          required
          className="mt-4 max-w-[12rem]"
        >
          {({ id, describedBy, invalid }) => (
            <input
              id={id}
              type="number"
              inputMode="numeric"
              min={1800}
              max={new Date().getFullYear()}
              placeholder="1996"
              aria-describedby={describedBy}
              aria-invalid={invalid}
              className={inputClass}
              {...register('yearBuilt')}
            />
          )}
        </Field>

        <fieldset className="mt-4">
          <legend className="text-sm font-medium text-soil">Occupancy</legend>
          <div className="mt-1.5 grid gap-2 sm:grid-cols-4">
            {(Object.keys(OCCUPANCY_LABELS) as (keyof typeof OCCUPANCY_LABELS)[]).map((value) => (
              <label
                key={value}
                className="flex min-h-[2.75rem] cursor-pointer items-center gap-2.5 rounded-md border bg-paper-raised px-3 py-2.5 text-sm transition-colors hover:border-steel has-checked:border-2 has-checked:border-soil"
              >
                <input
                  type="radio"
                  value={value}
                  className="h-4 w-4 accent-[var(--soil)]"
                  {...register('occupancy')}
                />
                <span className="text-soil">{OCCUPANCY_LABELS[value]}</span>
              </label>
            ))}
          </div>
        </fieldset>
      </FormSection>

      {/* ── 3. What do you need? ────────────────────────────────────────── */}
      <FormSection index="3" title="What do you need?">
        <Controller
          control={control}
          name="divisions"
          render={({ field }) => {
            const value = field.value ?? [];
            const toggle = (slug: string) =>
              field.onChange(
                value.includes(slug as never)
                  ? value.filter((v) => v !== slug)
                  : [...value, slug as never],
              );
            return (
              <fieldset>
                <legend className="text-sm font-medium text-soil">
                  Choose what applies
                  <span className="ml-1 text-flag" aria-hidden>
                    *
                  </span>
                </legend>
                {errors.divisions ? (
                  <p id="divisions-error" className="mt-1 text-sm font-medium text-flag">
                    {errors.divisions.message}
                  </p>
                ) : null}
                <div className="mt-1.5 grid gap-2 sm:grid-cols-2">
                  {launchedDivisions.map((d) => (
                    <label
                      key={d.slug}
                      className={cn(
                        'flex min-h-[2.75rem] cursor-pointer items-start gap-2.5 rounded-md border bg-paper-raised px-3 py-2.5 text-sm transition-colors',
                        value.includes(d.slug) ? 'border-2 border-soil bg-paper' : 'hover:border-steel',
                      )}
                    >
                      <input
                        type="checkbox"
                        checked={value.includes(d.slug)}
                        onChange={() => toggle(d.slug)}
                        onBlur={field.onBlur}
                        aria-describedby={errors.divisions ? 'divisions-error' : undefined}
                        className="mt-0.5 h-4 w-4 accent-[var(--soil)]"
                      />
                      <span>
                        <span className="block font-medium text-soil">{d.name}</span>
                        <span className="block text-xs text-steel">{d.promise}</span>
                      </span>
                    </label>
                  ))}
                  <label
                    className={cn(
                      'flex min-h-[2.75rem] cursor-pointer items-start gap-2.5 rounded-md border bg-paper-raised px-3 py-2.5 text-sm transition-colors sm:col-span-2',
                      value.includes('trade-coordination')
                        ? 'border-2 border-soil bg-paper'
                        : 'hover:border-steel',
                    )}
                  >
                    <input
                      type="checkbox"
                      checked={value.includes('trade-coordination')}
                      onChange={() => toggle('trade-coordination')}
                      className="mt-0.5 h-4 w-4 accent-[var(--soil)]"
                    />
                    <span>
                      <span className="block font-medium text-soil">Something else</span>
                      <span className="block text-xs text-steel">
                        Including anything needing a licensed trade — describe it below and we will
                        route it.
                      </span>
                    </span>
                  </label>
                </div>
              </fieldset>
            );
          }}
        />

        <Field
          id="description"
          label="Describe it"
          hint="What is happening, how long it has been happening, and what you want done. A couple of sentences is plenty."
          error={errors.description?.message}
          required
          className="mt-4"
        >
          {({ id, describedBy, invalid }) => (
            <textarea
              id={id}
              rows={5}
              aria-describedby={describedBy}
              aria-invalid={invalid}
              className={cn(inputClass, 'resize-y')}
              {...register('description')}
            />
          )}
        </Field>

        <fieldset className="mt-4">
          <legend className="text-sm font-medium text-soil">How soon?</legend>
          <div className="mt-1.5 grid gap-2 sm:grid-cols-3">
            {(Object.keys(URGENCY_LABELS) as (keyof typeof URGENCY_LABELS)[]).map((value) => (
              <label
                key={value}
                className="flex min-h-[2.75rem] cursor-pointer items-center gap-2.5 rounded-md border bg-paper-raised px-3 py-2.5 text-sm transition-colors hover:border-steel has-checked:border-2 has-checked:border-soil"
              >
                <input
                  type="radio"
                  value={value}
                  className="h-4 w-4 accent-[var(--soil)]"
                  {...register('urgency')}
                />
                <span className="text-soil">{URGENCY_LABELS[value]}</span>
              </label>
            ))}
          </div>
          <p className="mt-2 text-sm text-steel">
            If water is actively running or someone is unsafe, please call{' '}
            <a href={company.phoneHref} className="text-soil underline underline-offset-2">
              {company.phone}
            </a>{' '}
            rather than waiting on this form.
          </p>
        </fieldset>

        <div className="mt-5">
          <p className="text-sm font-medium text-soil">
            Photos <span className="font-normal text-steel">(optional, up to 6)</span>
          </p>
          <p className="mt-1 mb-2.5 text-sm text-steel">
            Photos make our quote much more accurate — most of the time we can give you a firm
            number instead of a range.
          </p>
          <PhotoUpload photos={photos} onChange={setPhotos} disabled={submitting} />
        </div>
      </FormSection>

      {/* ── 4. How we reach you ─────────────────────────────────────────── */}
      <FormSection index="4" title="How we reach you" last>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field id="name" label="Name" error={errors.name?.message} required>
            {({ id, describedBy, invalid }) => (
              <input
                id={id}
                type="text"
                autoComplete="name"
                aria-describedby={describedBy}
                aria-invalid={invalid}
                className={inputClass}
                {...register('name')}
              />
            )}
          </Field>
          <Field id="phone" label="Phone" error={errors.phone?.message} required>
            {({ id, describedBy, invalid }) => (
              <input
                id={id}
                type="tel"
                autoComplete="tel"
                aria-describedby={describedBy}
                aria-invalid={invalid}
                className={inputClass}
                {...register('phone')}
              />
            )}
          </Field>
        </div>

        <Field id="email" label="Email" error={errors.email?.message} required className="mt-4">
          {({ id, describedBy, invalid }) => (
            <input
              id={id}
              type="email"
              autoComplete="email"
              aria-describedby={describedBy}
              aria-invalid={invalid}
              className={inputClass}
              {...register('email')}
            />
          )}
        </Field>

        <fieldset className="mt-4">
          <legend className="text-sm font-medium text-soil">Best way to reach you</legend>
          <div className="mt-1.5 grid gap-2 sm:grid-cols-3">
            {(
              Object.keys(CONTACT_PREFERENCE_LABELS) as (keyof typeof CONTACT_PREFERENCE_LABELS)[]
            ).map((value) => (
              <label
                key={value}
                className="flex min-h-[2.75rem] cursor-pointer items-center gap-2.5 rounded-md border bg-paper-raised px-3 py-2.5 text-sm transition-colors hover:border-steel has-checked:border-2 has-checked:border-soil"
              >
                <input
                  type="radio"
                  value={value}
                  className="h-4 w-4 accent-[var(--soil)]"
                  {...register('contactPreference')}
                />
                <span className="text-soil">{CONTACT_PREFERENCE_LABELS[value]}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <Field
          id="accessNotes"
          label="Who do we contact to arrange entry?"
          optionalLabel
          hint={
            <>
              A name and number, or &ldquo;tenant on site&rdquo;, or &ldquo;our office will
              arrange it&rdquo;.{' '}
              <strong className="font-semibold text-soil">
                Don&rsquo;t send gate or lockbox codes here
              </strong>{' '}
              — we collect those securely later, and anything that looks like a code is
              automatically removed before it is stored.
            </>
          }
          error={errors.accessNotes?.message}
          className="mt-4"
        >
          {({ id, describedBy, invalid }) => (
            <textarea
              id={id}
              rows={3}
              aria-describedby={describedBy}
              aria-invalid={invalid}
              className={cn(inputClass, 'resize-y')}
              {...register('accessNotes')}
            />
          )}
        </Field>
      </FormSection>

      <div className="mt-8 border-t pt-6">
        <Turnstile
          siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
          onToken={setTurnstileToken}
        />
        <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center">
          <Button type="submit" size="lg" disabled={submitting}>
            {submitting ? 'Sending…' : 'Send request'}
          </Button>
          <p className="text-sm text-steel">
            {company.responseCommitment} No obligation, and we will not add you to a mailing list.
          </p>
        </div>
        <p className="mt-4 text-sm text-steel">
          By sending this you agree to our{' '}
          <Link href="/legal/terms" className="text-soil underline underline-offset-2">
            terms
          </Link>{' '}
          and{' '}
          <Link href="/legal/privacy" className="text-soil underline underline-offset-2">
            privacy notice
          </Link>
          .
        </p>
      </div>
    </form>
  );
}

function FormSection({
  index,
  title,
  children,
  last,
}: {
  index: string;
  title: string;
  children: React.ReactNode;
  last?: boolean;
}) {
  return (
    <section className={cn('py-7', !last && 'border-b')}>
      <div className="mb-4 flex items-baseline gap-3">
        <span className="text-xs font-semibold text-ink-muted">{index}</span>
        <h2 className="text-xl font-semibold text-soil">{title}</h2>
      </div>
      {children}
    </section>
  );
}

/** Exported for the page: maps a division slug from a query string. */
export function divisionFromSlug(slug: string | undefined): LeadFormValues['divisions'] {
  if (!slug) return [];
  return allDivisions.some((d) => d.slug === slug)
    ? ([slug] as LeadFormValues['divisions'])
    : [];
}
