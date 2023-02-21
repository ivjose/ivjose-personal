interface CustomElements extends HTMLFormControlsCollection {
  name: HTMLInputElement;
  email: HTMLInputElement;
  message: HTMLTextAreaElement;
}

interface CustomForm extends HTMLFormElement {
  readonly elements: CustomElements;
}

const ContactForm = () => {
  async function handleSubmit(e: React.FormEvent<CustomForm>) {
    e.preventDefault();

    const { name, email, message } = e.currentTarget.elements;

    const values = {
      name: name.value,
      email: email.value,
      message: message.value,
    };

    console.log(values, 'ASDASD');
    alert('Form submitted');
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
        onSubmit={handleSubmit}
        className=" mt-6 w-full space-y-4"
      >
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
        <div className="sm:col-span-2 sm:flex sm:justify-end">
          <button
            type="submit"
            className="mt-2 inline-flex w-full items-center justify-center rounded-md border border-transparent bg-slate-700 px-6 py-3 text-xl font-medium text-white shadow-sm hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-700  focus:ring-offset-2 sm:w-auto"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
