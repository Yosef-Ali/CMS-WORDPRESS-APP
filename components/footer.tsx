// import Container from './container'
// import { EXAMPLE_PATH } from '../lib/constants'

import FooterMenu from "./footer-menu";
import SocialMediaLinks from "./social-media-links";
import Logo from "./logo";

// export default function Footer() {
//   return (
//     <footer className="border-t bg-accent-1 border-accent-2">
//       <Container>
//         <div className="flex flex-col items-center py-28 lg:flex-row">
//           <h3 className="mb-10 text-4xl font-bold leading-tight tracking-tighter text-center lg:text-5xl lg:text-left lg:mb-0 lg:pr-4 lg:w-1/2">
//             Statically Generated with Next.js.
//           </h3>
//           <div className="flex flex-col items-center justify-center lg:flex-row lg:pl-4 lg:w-1/2">
//             <a
//               href="https://nextjs.org/docs/basic-features/pages"
//               className="px-12 py-3 mx-3 mb-6 font-bold text-white transition-colors duration-200 bg-black border border-black hover:bg-white hover:text-black lg:px-8 lg:mb-0"
//             >
//               Read Documentation
//             </a>
//             <a
//               href={`https://github.com/vercel/next.js/tree/canary/examples/${EXAMPLE_PATH}`}
//               className="mx-3 font-bold hover:underline"
//             >
//               View on GitHub
//             </a>
//           </div>
//         </div>
//       </Container>
//     </footer>
//   )
// }

export default function Footer() {
  return (
    <section className="body-font bg-secondary ">
      <div className="mx-auto max-w-screen-xl px-4 pt-16 pb-6 sm:px-6 lg:pt-24">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div>
            <div className="flex flex-1 flex-col items-center md:items-start md:gap-12">
              <a className="block text-primary" href="/">
                <span className="sr-only">Home</span>
                <Logo color="white" />
              </a>
            </div>

            <p className="font-noto mx-auto mt-6 max-w-md text-center leading-relaxed text-gray-400 sm:mx-0 sm:max-w-xs sm:text-left">
              በዚህ ድረ ገጽ የካቶሊካዊት ቤተ ክርስቲያን ሕይወት፣ እምነትና ትምህርትን በእውነትና በመንፈስ እየተማሩ፣
              እየኖሩና እየመሰከሩ ከእኛ ጋር ይጓዙ
            </p>

            <SocialMediaLinks />
          </div>

          <FooterMenu />
        </div>

        <div className="mt-12 border-t border-gray-800 pt-6">
          <div className="text-center sm:flex sm:justify-between sm:text-left">
            <p className="text-sm text-gray-400">
              <a href="mailto:yosethio@yahoo.com" className="block sm:inline">
                Developed By Yosef.
              </a>
            </p>

            <p className="mt-4 text-sm text-gray-500 sm:order-first sm:mt-0">
              &copy; 2022 The Archdioceses of Addis Ababa, Ethiopia
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
