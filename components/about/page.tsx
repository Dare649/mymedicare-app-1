import Card from "../card/page";
import { LiaStethoscopeSolid } from "react-icons/lia";
import { FaMeteor } from "react-icons/fa6";
import { skipText } from "@/data/dummy";
import TransparentCard from "../transparent-card/page";
import Image from "next/image";


const About = () => {
  return (
    <div className='w-full  lg:mt-[200px] sm:mt-20'>
      <div className="lg:px-[40px] sm:px-3">
        <div className='w-full flex lg:flex-row sm:flex-col gap-y-5 '>
            <div className='md:w-[50%] sm:w-full flex flex-col float-left'>
                <h2 className='lg:text-[48px] sm:text-3xl font-[600] text-[#1E293B]'>Why should you use <br />MyMedicare today?</h2>
            </div>
            <div className='md:w-[50%] sm:w-full flex flex-col'>
                <p className='first-letter:capitalize text-secondary-7 lg:text-[20px] sm:text-lg font-[500] tracking-wider'>we put you at the forefront of our innovation and healthcare provision <br />ensuring constant reliability and affordability of the services you receive</p>
            </div>
        </div>
        <div className='w-full grid lg:grid-cols-3 sm:grid-cols-1 gap-[54px] my-20'>
            <div className="h-[384px] lg:w-[384px] sm:w-full flex flex-col justify-evenly">
                <Card
                    className="bg-[#F1F5F9] h-full w-full"
                >
                    <div className="lg:px-[10px] lg:pt-[40px]">
                        <h2 className="capitalize lg:text-[24px] sm:text-lg font-[600] text-secondary-10">medical professionals are at <br /> your fingertips</h2>
                        <div className="mt-24 border-t-2 border-secondary-4 w-full">
                            <p className="text-secondary-5 font-[500] lg:text-[16px] sm:text-sm first-letter:capitalize lg:mt-2 sm:mt-5">we connect you to qualified medical <br />professionals saving you the stress <br />of long traffic and queues before access <br />quality care </p>
                        </div>
                    </div>
                </Card>
            </div>
            <div className="h-[384px] lg:w-[384px] sm:w-full">
                <Card
                    className="bg-secondary-5 w-full relative h-full"
                >
                    <div
                        className="absolute inset-0 bg-cover bg-center rounded-4xl"
                        style={{ backgroundImage: 'url(/hospital-queue.jpg)' }}
                    >
                    </div>
                    <div className="lg:px-[10px] lg:py-[48px]">
                        <div className="relative z-10">
                        <h2 className="lg:text-[24px] sm:text-lg font-[600] text-white first-letter:capitalize">skip long waiting hours at the hospital</h2>
                        </div>
                        <div className="flex flex-col lg:gap-3 sm:gap-1 lg:mt-24 sm:mt-40">
                            <div className="lg:w-[304px] sm:w-full h-[40px] flex flex-row items-center gap-x-3">
                                <div className="lg:w-[119px] sm:w-full">
                                <TransparentCard >
                                    <h2 className="font-[500] lg:text-[16px] sm:text-xs capitalize text-sm text-center lg:p-2 sm:p-0.5 text-white">quick access</h2>
                                </TransparentCard>
                                </div>
                                <div className="lg:w-[168px] sm:w-full">
                                    <TransparentCard>
                                        <h2 className="font-[500] lg:text-[16px] sm:text-xs capitalize text-sm text-center lg:p-2 sm:p-0.5 text-white">virtual consultation</h2>
                                    </TransparentCard>
                                </div>
                            </div>
                            <div className="lg:w-[304px] sm:w-full h-[40px] flex flex-row items-center gap-x-3">
                                <div className="lg:w-[102px] sm:w-full">
                                <TransparentCard>
                                    <h2 className="font-[500] lg:text-[16px] sm:text-xs capitalize text-sm text-center lg:p-2 sm:p-0.5 text-white">no queues</h2>
                                </TransparentCard>
                                </div>
                                <div className="lg:w-[109px] sm:w-full">
                                    <TransparentCard>
                                        <h2 className="font-[500] lg:text-[16px] sm:text-xs capitalize text-sm text-center lg:p-2 sm:p-0.5 text-white">time saving</h2>
                                    </TransparentCard>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </Card>
            </div>
            <div className="h-[384px] lg:w-[384px] sm:w-full flex flex-col justify-evenly">
                <Card
                    className="bg-[#F1F5F9] h-full w-full"
                >
                    <div className="lg:px-[10px] lg:pt-[40px]">
                        <h2 className="capitalize lg:text-[24px] sm:text-lg font-[600] text-secondary-10">access quality care</h2>
                        <div className="mt-36 border-t-2 border-secondary-4 w-full">
                            <p className="text-secondary-5 font-medium lg:text-[16px] sm:text-sm first-letter:capitalize lg:mt-2 sm:mt-5">experience personal and holistic care <br />tailored to your unique need, ensuring you <br />quality healthcare you deserve </p>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
      </div>
      <div className="w-full flex flex-col mt-28 mb-5">
        <h2 className="capitalize md:text-5xl sm:text-3xl font-medium text-center">smart insights, seamless access</h2>
        <p className="text-secondary-5 font-medium text-center leading-normal tracking-widest mt-10">Stay on top of your health with intuitive charts and real-time data, all in one place</p>
      </div>
      {/* Centered Image Section */}
      <div className='bg-gradient-to-br from-white to-blue-100 w-full flex justify-center items-center'>
          <div className='relative w-full h-[520px]'>
            <Image
              src="/smart-insights-png.png"
              alt="smart-insights"
              fill
              className="object-contain rounded-4xl h-full"
              quality={100}
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
    </div>
  )
}

export default About
