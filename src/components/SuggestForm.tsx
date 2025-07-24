'use client';
import { Lightbulb, SendHorizonal } from 'lucide-react';
import React, { useState, useEffect, useActionState, Dispatch, SetStateAction } from 'react';
import { saveSuggestion } from '@/actions/saveSuggestion';
import { toast } from 'sonner';

const clearFieldError = (
  field: keyof typeof initialErrors,
  setErrors: Dispatch<SetStateAction<FormErrors>>
) => setErrors(prev => {
  const { [field]: _discard, ...rest } = prev;
  return rest;
});

type FormErrors = Record<string, string>;
const initialErrors: FormErrors = {};

export default function SuggestForm() {
  const [errors, setErrors] = useState<FormErrors>(initialErrors);
  const [topic, setTopic] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');

  const [state, formAction, isPending] = useActionState(
    saveSuggestion,
    {status: 'INITIAL'}
  );

  useEffect(() => {
    if (state?.status === 'ERROR' && state.fieldErrors) {
      setErrors(
        Object.fromEntries(
          Object.entries(state.fieldErrors).map(([k, v]) => [k, v?.[0] ?? ''])
        )
      );

      toast.error(state.error || 'Oops! An error occurred', {
            action: { label: "X", onClick: () => {}, },})
    }

    if (state?.status === 'SUCCESS') {
      setEmail('');
      setTopic('');
      setDescription('');

      toast.success("Thanks for your suggestion!", {
            action: { label: "X", onClick: () => {}, },})
    }
  }, [state]);


  const inputClass = (field: keyof FormErrors) =>
    `form-input ${errors[field] ? 'outline outline-2 outline-red-600' : 'outline-none'}`;

  return (
    <section className="space-y-4 rounded shadow py-6 px-1 my-6 bg-white/60 dark:bg-[#1f1f1f99]">
      <div className="lg:max-w-7xl mx-auto">
        <h2 className="flex items-center justify-center gap-2 text-2xl font-bold">
          <Lightbulb className="text-yellow-500" size={24} /> Suggest a Topic
        </h2>

        <p className="my-5 text-center text-gray-700 dark:text-gray-300">
          Have a legend, event, or place you want featured? Suggest it below!
        </p>

        <div className="mx-auto w-full max-w-7xl rounded bg-white/70 p-5 shadow dark:bg-[#1f1f1fBB]">
          <form action={formAction} className="flex flex-col gap-3">
            {/* Email */}
            <label htmlFor="email" className="font-semibold">Email:</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={e => {
                setEmail(e.target.value);
                clearFieldError('email', setErrors);
              }}
              className={inputClass('email')}
              required
            />
            {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}

            {/* Topic */}
            <label htmlFor="topic" className="font-semibold">Topic:</label>
            <input
              id="topic"
              name="topic"
              type="text"
              placeholder="Enter a topic or event"
              value={topic}
              onChange={e => {
                setTopic(e.target.value);
                clearFieldError('topic', setErrors);
              }}
              className={inputClass('topic')}
              required
            />
            {errors.topic && <p className="text-sm text-red-600">{errors.topic}</p>}

            {/* Description */}
            <label htmlFor="description" className="font-semibold">Description:</label>
            <textarea
              id="description"
              name="description"
              placeholder="Describe the topic you want to suggest"
              value={description}
              onChange={e => {
                setDescription(e.target.value);
                clearFieldError('description', setErrors);
              }}
              className={`${inputClass('description')} h-32 resize-y`}
            />
            {errors.description && <p className="text-sm text-red-600">{errors.description}</p>}

            {/* Submit */}
            <button type="submit" className="btn" disabled={isPending}>
              {isPending ? 'Loading…' : <>
              Submit
              <SendHorizonal className="ml-2 inline" size={16} />
              </>}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
