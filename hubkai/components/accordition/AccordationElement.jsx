"use client";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Transition,
} from "@headlessui/react";

function AccordationElement({ topic, content }) {
  return (
    <Disclosure as="div" className="w-12/12 sm:w-8/12 md:w-11/12 lg:w-8/12">
      {({ open }) => (
        <>
          <DisclosureButton
            className={`w-full justify-between  border-2 border-plume-wine px-4 py-2 text-left text-sm font-medium  flex transition-all duration-300
              ${open ? "rounded-t-lg" : "rounded-lg"}
              ${open ? "bg-plume-wine dark:bg-linen-cloud text-linen-cloud dark:text-plume-wine" : "text-plume-wine dark dark:text-linen-cloud"}`}
          >
            <span>{topic}</span>
          </DisclosureButton>

          <Transition
            enter="transition duration-300 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-300 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <DisclosurePanel
              className="w-full px-4 pb-2 pt-4 max-w-none text-sm rounded-b-lg text-justify prose prose-sm
               prose-p:text-purple-950
                prose-headings:text-purple-950
                 prose-li:text-purple-950
                 dark:prose-p:text-linen-cloud
                 dark:prose-headings:text-linen-cloud
                 dark:prose-li:text-linen-cloud
                  prose-p:font-inter prose-headings:font-inter prose-li:font-inter"
            >
              <div dangerouslySetInnerHTML={{ __html: content }} />
            </DisclosurePanel>
          </Transition>
        </>
      )}
    </Disclosure>
  );
}

export default AccordationElement;
