import React from "react";
import SocialMediaLinks from "../components/social-media-links";
import Layout from "../components/layout";
import Banner from "../components/banner";

function EmailForm() {
  return (
    <form
      className="-m-2 flex flex-wrap"
      action="https://api.staticforms.xyz/submit"
      method="post"
    >
      <div className="w-1/2 p-2">
        <div className="relative">
          <label htmlFor="name" className="text-sm leading-7 text-gray-600">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="w-full rounded border border-gray-300 bg-gray-100 bg-opacity-50 px-3 py-1 text-base leading-8 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200"
          />
        </div>
      </div>
      <div className="w-1/2 p-2">
        <div className="relative">
          <label htmlFor="email" className="text-sm leading-7 text-gray-600">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full rounded border border-gray-300 bg-gray-100 bg-opacity-50 px-3 py-1 text-base leading-8 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200"
          />
        </div>
      </div>
      <div className="w-full p-2">
        <div className="relative">
          <label htmlFor="message" className="text-sm leading-7 text-gray-600">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            className="h-32 w-full resize-none rounded border border-gray-300 bg-gray-100 bg-opacity-50 px-3 py-1 text-base leading-6 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200"
          ></textarea>
          <input type="text" name="honeypot" style={{ display: "none" }} />
          <input
            type="hidden"
            name="accessKey"
            value="65ebe663-64b2-4bb6-b7f2-316093c091ac"
          />
          <input
            type="hidden"
            name="subject"
            value="Contact us from - ethiocatholicaddis.org"
          />
          <input type="hidden" name="replyTo" value="@" />
          <input
            type="hidden"
            name="redirectTo"
            value="http://localhost:8001/contact"
          />
        </div>
      </div>
      <div className="w-full p-2">
        <input
          type="submit"
          value="Submit"
          className="mx-auto flex rounded border-0 bg-secondary px-8 py-2 text-lg uppercase text-white transition hover:bg-secondary/90 hover:shadow-lg focus:outline-none"
        />
      </div>
    </form>
  );
}

function ContactAddress() {
  return (
    <div className="mt-8 flex w-full flex-col items-center justify-center border-t border-gray-200 p-2 pt-8 text-center">
      <a href="/" className="text-secondary">
        acsec@ethionet.et
      </a>
      <SocialMediaLinks color="secondary" />
    </div>
  );
}

export default function contact() {
  return (
    <Layout>
      <div className="hidden lg:block">
        <Banner title="Get in touch" />
      </div>
      <section className="body-font relative text-gray-600">
        <div className="container mx-auto px-5 py-24">
          <div className="mb-12 flex w-full flex-col text-center">
            <h1 className="title-font mb-4 text-2xl font-medium text-gray-900 sm:text-3xl">
              Get in touch
            </h1>
            <p className="mx-auto text-base leading-relaxed lg:w-2/3">
              Welcome to the Archbishop of Addis Ababa
            </p>
          </div>
          <div className="mx-auto md:w-2/3 lg:w-1/2">
            <EmailForm />
            <ContactAddress />
          </div>
        </div>
      </section>
    </Layout>
  );
}
