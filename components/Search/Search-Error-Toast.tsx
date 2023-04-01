import React, { useEffect, useState } from "react";
import * as Toast from "@radix-ui/react-toast";
import { useInstantSearch } from "react-instantsearch-hooks-web";
import { clsx } from "clsx";

export default function SearchErrorToast() {
  const { use } = useInstantSearch();
  const [error, setError] = useState(null);

  useEffect(() => {
    const middleware = ({ instantSearchInstance }) => {
      function handleError(searchError) {
        setError(searchError);
      }

      return {
        subscribe() {
          instantSearchInstance.addListener("error", handleError);
        },
        unsubscribe() {
          instantSearchInstance.removeListener("error", handleError);
        },
      };
    };

    return use(middleware);
  }, [use]);

  if (!error) {
    return null;
  }

  return (
    <Toast.Provider>
      <Toast.Root
        onOpenChange={(isOpen) => {
          if (!isOpen) {
            setError(null);
          }
        }}
        className={clsx(
          "fixed inset-x-4 bottom-4  w-auto rounded-lg shadow-lg md:top-4 md:right-4 md:left-auto md:bottom-auto md:w-full md:max-w-sm",
          "bg-white dark:bg-gray-800",
          "radix-state-open:animate-toast-slide-in-bottom md:radix-state-open:animate-toast-slide-in-right",
          "radix-state-closed:animate-toast-hide",
          "radix-swipe-direction-right:radix-swipe-end:animate-toast-swipe-out-x",
          "radix-swipe-direction-right:translate-x-radix-toast-swipe-move-x",
          "radix-swipe-direction-down:radix-swipe-end:animate-toast-swipe-out-y",
          "radix-swipe-direction-down:translate-y-radix-toast-swipe-move-y",
          "radix-swipe-cancel:translate-x-0 radix-swipe-cancel:duration-200 radix-swipe-cancel:ease-[ease]"
        )}
      >
        {/* <Toast.Title>{error.name}</Toast.Title>
        <Toast.Description>{error.message}</Toast.Description> */}
        <div className="z-50 flex">
          <div className="flex w-0 flex-1 items-center py-4 pl-5">
            <div className="radix w-full">
              <Toast.Title className="text-sm font-medium text-gray-900 dark:text-gray-100">
                {error.name} Offline !!!
              </Toast.Title>
              <Toast.Description className="mt-1 text-sm text-gray-700 dark:text-gray-400">
                {error.message}
              </Toast.Description>
            </div>
          </div>
        </div>
      </Toast.Root>

      <Toast.Viewport />
    </Toast.Provider>
  );
}
