'use client';

import { useState } from "react";
import Card from "../card/page";
import TransparentCard from "../transparent-card/page";
import Image from "next/image";
import Link from "next/link";
import { HiOutlineLightBulb } from "react-icons/hi";
import { faq } from "@/data/dummy";

const Pricing = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  return (
    <div className='w-full lg:p-10 sm:p-3 sm:mt-20 lg:mt-0'>
      <div className='w-full flex lg:flex-row items-center justify-between sm:flex-col gap-y-10 lg:px-[40px] sm:px-0'>
        <div className="lg:w-[515px] sm:w-full">
          <h2 className='first-letter:capitalize lg:text-[40px] sm:text-3xl font-[600] text-tertiary-1'>choose the right plan <br />for your health journey</h2>
        </div>
        <div className="lg:w-[534px] sm:w-full">
          <p className="text-secondary-5 font-[500] text-[20px] first-letter:capitalize">accessible and reliable plans thoughtfully tailored to support  your unique health journey and empower you with personalized care options. </p>
        </div>
      </div>
      <div className='w-full my-20 flex lg:flex-row sm:flex-col gap-[54px] lg:px-[40px] sm:px-0'>
        <div className="h-[544px]  lg:w-[584px] sm:w-full">
          <Card
              className="bg-secondary-5 w-full h-full"
          >
            <div className="w-full p-2">
                <h2 className="capitalize font-[500] text-secondary-10 lg:text-[28px] sm:text-xl">remote monitoring</h2>
                <div className="w-full lg:my-10 sm:my-5 border-t-[1.5] border-[#647488]">
                    <p className="text-[#647488] font-[500] lg:text-[16px] sm:text-sm mt-5">Stay connected with your health from anywhere with real-time tracking <br /> personalized health reports and expert support from the comfort of<br />your home.</p>
                </div>
                <div className=" w-full">
                    <h2 className="capitalize lg:mb-10 sm:mb-5 text-tertiary-1 text-[16px] font-[600]">feature</h2>
                    <div className="flex items-center lg:flex-row sm:flex-col lg:w-[402px] lg:h-[40px] sm:h-[80px] sm:w-full lg:gap-[16px] sm:gap-0">
                      <div className="lg:w-[143px] sm:w-full h-full">
                        <TransparentCard>
                          <h2 className="font-[400] p-[0.4px] text-[15px] text-center text-secondary-5 ">Record your vitals</h2>
                        </TransparentCard>
                      </div>
                      <div className="lg:w-[243px] sm:w-full h-full">
                        <TransparentCard>
                          <h2 className="font-[400] p-[0.4px] text-[15px] text-center text-secondary-5 ">Track your response to treatment</h2>
                        </TransparentCard>
                      </div>
                    </div>
                    <div className="flex items-center lg:flex-row sm:flex-col lg:w-[369px] lg:h-[40px] sm:h-[80px] sm:w-full lg:gap-[16px] sm:p-0">
                      <div className="lg:w-[231px] sm:w-full h-full">
                        <TransparentCard>
                          <h2 className="font-[400] p-[0.4px] text-[15px] text-center text-secondary-5 ">Professional remote monitoring</h2>
                        </TransparentCard>
                      </div>
                      <div className="lg:w-[122px] sm:w-full h-full">
                        <TransparentCard>
                          <h2 className="font-[400] p-[0.4px] text-[15px] text-center capitalize text-secondary-5 ">Monthly report</h2>
                        </TransparentCard>
                      </div>
                    </div>

                </div>
                <h2 className="lg:text-[60px] sm:text-4xl font-[600] text-tertiary-1">₦1000</h2>
            </div>
          </Card>
        </div>
        <div className="h-[544px] lg:w-[584px] sm:w-full">
          <Card
            className="bg-secondary-5 w-full"
          >
            <div className="w-full p-2">
                <h2 className="capitalize font-[500] text-secondary-10 lg:text-[28px] sm:text-xl">other services</h2>
                <div className="w-full lg:my-10 sm:my-5 border-t-[1.5] border-[#647488]">
                    <p className="text-[#647488] font-[500] lg:text-[16px] sm:text-sm mt-5">Stay connected with your health from anywhere with real-time tracking <br /> personalized health reports and expert support from the comfort of<br />your home.</p>
                </div>
                <div className=" w-full mb-22">
                    <h2 className="capitalize mb-10 text-tertiary-1 text-[16px] font-[600]">feature</h2>
                    <div className="flex items-center lg:flex-row sm:flex-col lg:w-[496px] lg:h-[40px] sm:h-[80px] sm:w-full lg:gap-[16px] sm:gap-5">
                      <div className="lg:w-[163px] sm:w-full h-full">
                        <TransparentCard>
                          <h2 className="font-[400] p-[0.4px] text-[15px] text-center text-secondary-5 ">Virtual Consultations</h2>
                        </TransparentCard>
                      </div>
                      <div className="lg:w-[139px] sm:w-full h-full">
                        <TransparentCard>
                          <h2 className="font-[400] p-[0.4px] text-[15px] text-center text-secondary-5 ">Request Lab Test</h2>
                        </TransparentCard>
                      </div>
                      <div className="lg:w-[138px] sm:w-full h-full">
                        <TransparentCard>
                          <h2 className="font-[400] p-[0.4px] text-[15px] text-center text-secondary-5 ">Request Prescription</h2>
                        </TransparentCard>
                      </div>
                    </div>
                </div>
                <div className="flex items-center gap-[40px]">
                  <Link href={'https://wa.me/2347025183434'} target="_blank">
                    <div className="bg-white rounded-full lg:w-14 lg:h-14 sm:w-12 sm:h-12 flex items-center justify-center p-1 cursor-pointer">
                      <Image
                        src="/whatsapp-icon.png"
                        alt="MyMedicare"
                        width={1000}
                        height={600}
                        className="w-full h-auto object-cover rounded-4xl "
                        quality={100}
                        priority
                    />
                    </div>
                  </Link>
                  <h2 className="text-tertiary-1 font-[500] lg:text-[24px] sm:text-xl">Reach us on WhatsApp for a quick <br />reply.</h2>
                </div>
            </div>
          </Card>
        </div>
      </div>
      <h2 className="text-tertiary-1 lg:text-[48px] sm:text-4xl font-[600] mb-10 md:mt-0 sm:mt-32 lg:px-[40px] sm:px-0">Empower your health journey with proactive <br />tracking <span className="text-secondary-5">and reduce health risk by up to 78%</span></h2>


      <div className="lg:px-[40px] sm:px-0 lg:h-[638px] sm:h-0">
        <div className="lg:flex sm:hidden w-full h-full relative rounded-4xl overflow-hidden p-10">
          <Image
              src="/Remote-Monitoring-Float.png"
              alt="MyMedicare"
              fill
              className="w-full h-full object-cover"
              quality={100}
              priority
          />

          {/* Full overlay with white fade at the bottom and centered text */}
          <div className="absolute inset-0 flex flex-col justify-center px-10 ">
              <div className="w-full lg:h-[88px] absolute top-16 right-0 left-7 px-10 z-20">
                <div className="flex items-center gap-[8px] w-full justify-end">
                  <div className="lg:w-[100px] lg:h-[40px]">
                    <TransparentCard>
                      <h2 className="text-tertiary-1 text-xs font-bold capitalize text-center">quick access</h2>
                    </TransparentCard>
                  </div>
                  <div className="lg:w-[70px] lg:h-[40px]">
                    <TransparentCard>
                      <h2 className="text-tertiary-1 text-xs font-bold capitalize text-center">health care</h2>
                    </TransparentCard>
                  </div>
                  <div className="lg:w-[60px] lg:h-[40px]">
                    <TransparentCard>
                      <h2 className="text-tertiary-1 text-xs font-bold capitalize text-center">monitoring</h2>
                    </TransparentCard>
                  </div>
                </div>
                <div className="flex items-center gap-[8px] lg:h-[40px] float-right">
                  <div className="lg:w-[80px] lg:h-[40px]">
                    <TransparentCard>
                      <h2 className="text-tertiary-1 text-xs font-bold capitalize text-center">technology</h2>
                    </TransparentCard>
                  </div>
                  <div className="lg:w-[60px] lg:h-[40px]">
                    <TransparentCard>
                      <h2 className="text-tertiary-1 text-xs  font-bold capitalize text-center">support</h2>
                    </TransparentCard>
                  </div>
                </div>
              </div>
              <div className="w-[30%] absolute bottom-5">
                <Card
                    color="white"
                >
                    <div className="p-2">
                        <div className="flex flex-row items-center gap-3">
                            <div className="bg-tertiary-1 w-[24px] h-[24px] rounded-[6px] flex items-center justify-center p-1">
                                <HiOutlineLightBulb size={20}/>
                            </div>
                            <h2 className="text-tertiary-1 font-[500] text-[16px] capitalize">insights</h2>
                        </div>
                        <h2 className="first-letter:capitalize font-[600] text-tertiary-1 my-3 text-[24px">remote monitoring matters</h2>
                        <p className="first-letter:capitalize font-[400] text-secondary-6 text-[16px] mt-5">discover how staying informed about your health<br /> can lead to significant improvement by up to</p>
                        <h2 className="text-tertiary-1 text-[40px] font-[600] mt-10">78%</h2>
                    </div>
                </Card>
            </div>
          </div>
      </div>
      </div>

      <div className="my-16 w-full">
          <h2 className="text-tertiary-1 font-[600] capitalize lg:text-[40px] sm:text-4xl text-center">trusted partners with</h2>
          <div className="w-full overflow-hidden relative md:py-10 sm:py-5">
        {/* Scrolling container */}
        <div className="flex items-center w-max animate-scroll-x space-x-10">
          {[
            "/img-2.png",
            "/img-7.png",
            "/img-8.png",
            
          ]
            .concat([
              "/img-2.png",
              "/img-7.png",
              "/img-8.png",
            ],) // duplicate for seamless loop
            .concat([
              "/img-2.png",
              "/img-7.png",
              "/img-8.png",
            ]) // duplicate for seamless loop
            .concat([
              "/img-2.png",
              "/img-7.png",
              "/img-8.png",
            ]) // duplicate for seamless loop
            .map((src, index) => (
              <div key={index} className="md:w-32 md:h-20 sm:w-20 sm:h-10 relative flex-shrink-0">
                <Image src={src} alt={`Partner logo ${index}`} fill className="object-contain" />
              </div>
            ))}
        </div>
      </div>

      </div>

      <div className="lg:px-[40px] sm:px-0 w-full">
        <h2 className="lg:text-[48px] sm:text-3xl text-tertiary-1 font-[600] mb-4">Frequently Asked Questions</h2>
        <div className="w-full flex lg:flex-row sm:flex-col lg:mt-20 sm:mt-10 gap-x-10">
          <div className="lg:w-[432px] lg:h-[528px] sm:h-0 sm:w-0">
            <Image
                src="/image-32.png"
                alt="MyMedicare"
                width={1000}
                height={600}
                className="w-full h-auto object-cover rounded-4xl "
                quality={100}
                priority
            />
          </div>
          {/* FAQ Section */}
          <div className="lg:w-[736px] h-[480px] space-y-[20px] ">
            {faq.map((item, index) => (
              <div
                key={index}
                className={`border-b-2 border-[#94A3BB] lg:p-4 sm:p-2 transition-all duration-300 ${
                  openIndex === index ? "bg-primary-1" : ""
                }`}
              >
                <button
                  className="w-full lg:h-[28px] sm:h-[38px] text-left flex justify-between items-center cursor-pointer lg:text-[24px] sm:text-lg font-[500] transition-all duration-300"
                  onClick={() => toggleFAQ(index)}
                >
                  {item.qst}
                  <span className="ml-2">{openIndex === index ? "−" : "+"}</span>
                </button>
                {openIndex === index && (
                  <p className="mt-3 text-secondary-6 text-[16px] font-[400] rounded-lg transition-all duration-300">
                    {item.ans}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Pricing
