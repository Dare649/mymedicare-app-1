'use client';


import Image from "next/image";
import { FaSquareFacebook } from "react-icons/fa6";
import { FaInstagram, FaWhatsappSquare } from "react-icons/fa";
import { FaLinkedin, FaXTwitter } from "react-icons/fa6";
import { footerNav } from "@/data/dummy";
import Link from "next/link";

const Contact = () => {
  function getCopyrightYear() {
    const year = new Date().getFullYear();
    return `© ${year}`;
  }
  
  return (
    <div className="w-full lg:p-10 sm:p-3">
      <div className="w-full flex lg:flex-row sm:flex-col gap-y-10 lg:px-[40px] sm:px-0">
        {/* Left Text */}
        <div className="lg:w-[758px] lg:h-[224px] sm:w-full">
          <h2 className="text-tertiary-1 font-[600] lg:text-[40px] sm:text-3xl">
          Transform your wellness journey with MyMedicare, 
            <span className="text-secondary-6">
              with personalized health insights and expert guidance, available anytime, anywhere.
            </span>
          </h2>
        </div>
        {/* Download Section */}
        <div className="lg:w-[338px] lg:h-[228px] sm:h-[250px] sm:w-full flex flex-col gap-y-5 justify-center lg:items-end sm:items-start">
          <p className="text-secondary-5 text-[16px] font-[500] leading-relaxed tracking-wider text-left">
            Begin your health journey with <br /> MyMedicare today. Empower yourself <br />
            with control over your health, your data <br /> and your wellness.
          </p>
          <Link
            href={'https://play.google.com/store/apps/details?id=com.mymedicare.app'}
            target="_blank"
            rel="noopener noreferrer"
            className="border-2 border-tertiary-1 rounded-4xl p-5 mt-5 text-tertiary-1 hover:border-0 hover:bg-tertiary-1 hover:text-white w-full text-center font-semibold cursor-pointer"
          >
            Download our app
          </Link>
        </div>
      </div>

      <div className="w-full lg:mt-28 sm:mt-10 lg:px-[40px] sm:px-0"> 
          <div className="flex sm:float-start lg:float-none lg:flex-row sm:flex-col gap-5 items-center justify-between">
            <Image
              src={'/logo-2.png'}
              alt="stonepay-admin-app"
              width={100}
              height={100}
              className="lg:w-[200px] object-cover "
              quality={100}
              priority
            />
            <div className="grid lg:grid-cols-3 sm:grid-cols-1 lg:gap-8 sm:gap-3">
              {
                footerNav.map((item, id) => (
                  <Link
                    key={id}
                    href={item.path}
                    className="text-tertiary-1 capitalize font-semibold"
                  >
                    {item.title}
                  </Link>
                ))
              }
            </div>
          </div>
          <div className="w-full lg:border-t-2 sm:border-t-0 border-secondary-4 p-5 my-10">
            <div className="w-full flex lg:flex-row items-center justify-between sm:flex-col">
              <h2 className="text-secondary-5 text-lg font-semibold sm:mt-8 lg:mt-0">
                {getCopyrightYear()} MyMedicare. All rights reserved.
              </h2>
              <div className="flex flex-row item-center gap-3 sm:mt-8 lg:mt-0">
                <Link
                  href={'https://www.instagram.com/mymedicare_health?igsh=MTBpM29oaXNibWh1Yg=='} 
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaInstagram size={30}/>
                </Link> 
                <Link
                  href={'https://www.linkedin.com/company/my-medicare-healthcare/'} 
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaLinkedin size={30}/>
                </Link> 
                <Link
                  href={'https://x.com/mymedicare_ng?t=KIFOkpPJ5ztgyMSV1VSAcA&s=09'} 
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaXTwitter size={30}/>
                </Link> 
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Contact
