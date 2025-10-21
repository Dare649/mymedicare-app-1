import Card from "../card/page";
import Image from "next/image";
import Link from "next/link";

const Features = () => {
  return (
    <div className='w-full lg:p-10 sm:p-3 lg:px-[40px] sm:px-3 mt-10'>
      <div className='w-full flex lg:flex-row sm:flex-col items-center lg:gap-[151px] sm:gap-10'>
        <div className='lg:w-[515px] sm:w-full'>
            <h2 className='text-secondary-10 lg:text-[45px] sm:text-4xl font-[600]'>Who is Mymedicare for?</h2>
        </div>
        <div className='lg:w-[534px] sm:w-full'>
            <p className='text-secondary-6 tracking-wider text-[20px] font-[500] leading-relaxed'>MyMedicare is designed for anyone looking to track and understand their health better to make informed decisions for a healthier lifestyle.</p>
        </div>
      </div>
      <div className='w-full md:my-20 sm:my-5 flex flex-col gap-y-10'>
            <div className="w-full flex lg:flex-row sm:flex-col gap-[32px]">
                {/* patient */}
                <div className='lg:w-[536px] h-[614px]'>
                    <Card
                        className="bg-secondary-5 w-full h-full"
                    >
                        <div className="w-full h-full md:p-8 sm:p-4">
                            <h2 className="capitalize text-xl text-secondary-10">patient</h2>
                            <p className='text-secondary-6 tracking-wider my-5 leading-relaxed'>Access reliable health information and personalized resources <br />to help you make informed decisions about your wellbeing.</p>
                            <div className="">
                                <Image
                                    src="/chat.png" // replace with your actual image
                                    alt="MyMedicare"
                                    width={1200}
                                    height={800}
                                    className="w-full h-auto object-cover md:rounded-4xl sm:rounded-lg"
                                    quality={100}
                                    priority
                                />
                            </div>
                        </div>
                    </Card>
                </div>
                {/* health provider */}
                <div className='sm:w-full lg:w-[632px] h-[614px]'>
                    <Card
                        className="bg-secondary-5 w-full h-full"
                    >
                        <div className="w-full h-full md:p-8 sm:p-4">
                            <h2 className="capitalize text-xl text-secondary-10">health providers</h2>
                            <p className='text-secondary-6 tracking-wider my-5 leading-relaxed'>Has Google made you more worried about your symptoms? Worry no more! Have a real time consultation with a doctor today.</p>
                            <div className="h-full">
                                <Image
                                    src="/phone-call-968w.png" // replace with your actual image
                                    alt="MyMedicare"
                                    width={1200}
                                    height={800}
                                    className="w-full h-auto object-cover md:rounded-4xl sm:rounded-lg"
                                    quality={100}
                                    priority
                                />
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
            <div className="w-full flex lg:flex-row sm:flex-col gap-[32px] ">
                {/* prescription management */}
                <div className='sm:w-full lg:w-[632px] h-[614px]'>
                    <Card
                        className="bg-secondary-5 w-full h-full"
                    >
                        <div className="w-full h-full md:p-8 sm:p-4">
                            <h2 className="capitalize text-xl text-secondary-10">prescription management</h2>
                            <p className='text-secondary-6 tracking-wider my-5 leading-relaxed'>Has you blood pressure or blood sugar been high? We got you with our <br />special care plan.</p>
                            <div className="h-full">
                                <Image
                                    src="/prescription-management-combined.png" // replace with your actual image
                                    alt="MyMedicare"
                                    width={1200}
                                    height={800}
                                    className="w-full h-auto object-cover md:rounded-4xl sm:rounded-lg"
                                    quality={100}
                                    priority
                                />
                            </div>
                        </div>
                    </Card>
                </div>
                {/* remote monitoring */}
                <div className='lg:w-[536px] h-[614px]'>
                    <Card
                        className="bg-secondary-5 w-full h-full"
                    >
                        <div className="w-full h-full md:p-8 sm:p-4">
                            <h2 className="capitalize text-xl text-secondary-10">remote monitoring</h2>
                            <p className='text-secondary-6 tracking-wider my-5 leading-relaxed'>Stay connected with healthcare professionals who monitor your <br />vital signs remotely for early detection of your health issues.</p>
                            <div className="h-full">
                                <Image
                                    src="/remote-monitoring.png" // replace with your actual image
                                    alt="MyMedicare"
                                    width={1200}
                                    height={800}
                                    className="w-full h-auto object-cover md:rounded-4xl sm:rounded-lg"
                                    quality={100}
                                    priority
                                />
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
            
           <div className="flex flex-col items-center justify-center mx-auto lg:mb-32 sm:mb-10 mt-10">
                <h2 className="font-[500] text-[24px] text-[#1E293B] text-center">
                  Whether you're starting out or looking to stay on track, MyMedicare gives you the <br /> tools to manage your health confidently.
                </h2>

                <div className="lg:w-[264px] sm:w-full mt-10 lg:h-[86px] bg-[#0058E6] rounded-[9999px] lg:p-[27px] sm:p-5 gap-[9px] cursor-pointer">
                    <Link 
                       href={'/auth/sign-up'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-[500] text-[22px] lg:w-[210px] lg:h-[32px] sm:w-full flex items-center justify-center text-white"
                    >
                        Get Started Today
                    </Link>
                </div>
            </div>   
      </div>
      <div className="w-full h-[614px] md:flex sm:hidden relative rounded-4xl overflow-hidden">
            <Image
                src="/happy-man-01.png"
                alt="MyMedicare"
                fill
                className="w-full h-full object-cover"
                quality={100}
                priority
            />

            {/* Full overlay with white fade at the bottom and centered text */}
            <div className="absolute inset-0 flex flex-col justify-center px-20">
                <p className=" text-white z-10 mt-2 font-[500] text-[40px]">Get personalized health <br />recommendations tailored to <br />your needs, helping you access <br />healthcare wherever you <br />are</p>

                {/* White gradient fade at the bottom */}
                <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-white/80 to-transparent pointer-events-none" />
            </div>
        </div>
        <div className="lg:my-20 sm:my-0 w-full">
            <h2 className="font-[600] lg:text-[48px] sm:text-[22px] text-tertiary-1 text-center tracking-wide leading-relaxed">Simple steps to get to start <br />your health journey</h2>

            <div className=" w-full grid lg:grid-cols-3 sm:grid-cols-1 md:grid-cols-2 lg:gap-[52px] sm:gap-5 lg:mt-20 sm:mt-10">
                <div className="h-[384px] lg:w-[384px]">
                    <Card
                        className="bg-secondary-5 w-full"
                    >
                        <div className="w-full p-2">
                            <h2 className="capitalize font-[600] text-secondary-10 text-[28px]">step<span className="text-secondary-5"> 01</span></h2>
                            <div className="mt-[30%] w-full">
                                <h2 className="text-tertiary-1 font-[500] text-[24px] capitalize">get the app</h2>
                            </div>
                            <div className="lg:mt-10 sm:mt-5 border-t-2 border-secondary-6 w-full">
                                <p className="text-secondary-5 font-[500] text-[16px] first-letter:capitalize mt-5">Download the MyMedicare app to instantly <br />connect with healthcare services and <br /> professionals.</p>
                            </div>
                        </div>
                    </Card>
                </div>
                <div className="h-[384px] lg:w-[384px]">
                    <Card
                        className="bg-secondary-5 w-full"
                    >
                        <div className="w-full p-2">
                            <h2 className="capitalize font-[600] text-secondary-10 text-[28px]">step<span className="text-secondary-5"> 02</span></h2>
                            <div className="mt-[30%] w-full">
                                <h2 className="text-tertiary-1 font-[500] text-[24px] capitalize">personalize your health journey</h2>
                            </div>
                            <div className="lg:mt-1 sm:mt-5 border-t-2 border-secondary-6 w-full">
                                <p className="text-secondary-5 font-[500] text-[16px] first-letter:capitalize mt-5">Set your health goal for tailored wellness <br />experience, including appointments,  <br /> telemedicine, labs and remote monitoring.</p>
                            </div>
                        </div>
                    </Card>
                </div>
                <div className="h-[384px] lg:w-[384px] sm:mt-16 lg:mt-0">
                    <Card
                        className="bg-secondary-5 w-full"
                    >
                        <div className="w-full p-2">
                            <h2 className="capitalize font-[600] text-secondary-10 text-[28px]">step<span className="text-secondary-5"> 03</span></h2>
                            <div className="mt-[30%] w-full">
                                <h2 className="text-tertiary-1 font-[500] text-[24px] capitalize">monitor and archieve</h2>
                            </div>
                            <div className="lg:mt-10 sm:mt-5 border-t-2 border-secondary-6 w-full">
                                <p className="text-secondary-5 font-[500] text-[16px] first-letter:capitalize mt-5">embrace a healthier future by continuously  <br />tracking your progress, gaining insights and <br /> adapting to a new health innovation.</p>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
            
        </div>
    </div>
  )
}

export default Features
