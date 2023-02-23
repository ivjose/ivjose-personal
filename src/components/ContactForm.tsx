import Botpoison from '@botpoison/browser';
import { useEffect, useRef } from 'react';
import useForm from '../hooks/useForm';
import Alert from './Alert';
interface CustomElements extends HTMLFormControlsCollection {
  name: HTMLInputElement;
  email: HTMLInputElement;
  message: HTMLTextAreaElement;
}

const SUCCESS_MESSAGE = `Thanks for your message. I'll be in touch soon.`;
const ERROR_MESSAGE = 'Submission failed. Try again later';

const botpoison = new Botpoison({
  publicKey: import.meta.env.PUBLIC_CAPTCHA_KEY,
});

const ContactForm = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [data, submit, { reset, error, submitting }] = useForm(
    import.meta.env.PUBLIC_FORM_API
  );

  useEffect(() => {
    if (data.status === 'submitted') {
      formRef.current?.reset();
    }
  }, [data.status]);

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    reset();
    submitting();
    const { name, email, message } = e.target as typeof e.target &
      CustomElements;

    const values = {
      name: name.value,
      email: email.value,
      message: message.value,
    };

    try {
      const { solution } = await botpoison.challenge();

      await submit({
        ...values,
        _botpoison: solution,
      });
    } catch (err) {
      return error(ERROR_MESSAGE);
    }
  }

  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center justify-between p-6  lg:px-8">
      <h2 className="py-10 text-4xl font-bold leading-10 tracking-widest text-slate-700 lg:text-3xl">
        Just say Hi!
      </h2>
      <p className="text-xl text-slate-700">
        I'm looking forward to helping you. Just send a message about what I can
        do.
      </p>
      <form
        method="post"
        ref={formRef}
        onSubmit={handleSubmit}
        className=" mt-6 w-full space-y-4"
      >
        {data.status === 'error' && (
          <Alert status={data.status} message={ERROR_MESSAGE} />
        )}
        {data.status === 'submitted' && (
          <Alert status={data.status} message={SUCCESS_MESSAGE} />
        )}

        <div className="sm:col-span-2">
          <label
            htmlFor="name"
            className="block text-xl font-medium text-slate-900"
          >
            Name
          </label>
          <div className="mt-1">
            <input
              required
              type="text"
              name="name"
              id="name"
              placeholder="How should we call you"
              className="block w-full rounded-md border-slate-300  py-3 px-4 text-slate-900 shadow-sm focus:border-slate-500 focus:ring-slate-500"
            />
          </div>
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="email"
            className="block text-xl font-medium text-slate-900"
          >
            Email
          </label>
          <div className="mt-1">
            <input
              required
              type="email"
              name="email"
              id="email"
              placeholder="Your email address"
              className="block w-full rounded-md border-slate-300  py-3 px-4 text-slate-900 shadow-sm focus:border-slate-500 focus:ring-slate-500"
            />
          </div>
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="message"
            className="block text-xl font-medium text-slate-900"
          >
            Message
          </label>

          <div className="mt-1">
            <textarea
              required
              id="message"
              name="message"
              rows={4}
              placeholder="How can I help?"
              className="block w-full rounded-md border-slate-300  py-3 px-4 text-slate-900 shadow-sm focus:border-slate-500 focus:ring-slate-500"
              aria-describedby="message-max"
              defaultValue={''}
            />
          </div>
        </div>

        <div className="sm:col-span-2 ">
          <button
            type="submit"
            disabled={data.status === 'submitting'}
            className="inline-flex w-full items-center justify-center rounded-md border border-transparent bg-slate-700 px-6 py-3 text-xl font-medium text-white shadow-sm hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-700 focus:ring-offset-2 disabled:cursor-not-allowed  disabled:bg-slate-400 sm:w-auto"
          >
            {data.status === 'submitting' ? 'Submitting' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
