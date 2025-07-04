"use client";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Transition,
} from "@headlessui/react";

function AccordationElement({ topic, content }) {
  return (
    <Disclosure className="p-2">
      {({ open }) => (
        <div>
          <DisclosureButton
            className={`flex w-full justify-between bg-plume-wine px-4 py-2 text-left text-sm font-medium text-linen-cloud 
           ${open ? "rounded-t-lg" : "rounded-lg"}`}
          >
            <span>{topic}</span>
          </DisclosureButton>
          <Transition
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-100 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <DisclosurePanel className="px-4 pb-2 pt-4 text-sm text-gray-500 rounded-b-lg bg-nice-light-purple text-justify prose-sm">
              <div dangerouslySetInnerHTML={{ __html: content }} />
            </DisclosurePanel>
          </Transition>
        </div>
      )}
    </Disclosure>
  );
}

export default AccordationElement;
