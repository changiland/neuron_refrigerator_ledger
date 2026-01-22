import { Link, Head } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import IntroPhoto from '@/Images/IntrodutionPhoto.jpg';
import funcPhoto from '@/Images/functionphoto.webp';
import NewsComp from '@/Components/NewsComp';
export default function Welcome({auth, news}) {
    return (
        <>
            <Head title="ホームページ" />
            < MainLayout auth={auth}>
                <main className="flex flex-col space-y-6 w-[100%] mx-auto " /*style={{ backgroundImage: `url(${funcPhoto})`}}*/>

                    <div id="home" className=' relative border bg-blue-950 w-[70vw] h-[70vw] top-[15rem] rounded-[50rem] sm:top-0 border sm:rounded-l-[0em] sm:rounded-r-full sm:w-[50%] sm:h-[50vw]'>

                        <div className='absolute bg-cover bg-center w-full  h-[40vw] flex flex-col justify-end top-[15vw] right-[-20vw] sm:max-w-[800px] sm:h-[30vw] sm:max-h-[35em] sm:right-[-47vw] sm:top-[12vw] 2xl:h-[55vw] 2xl:right-[-45vw] 2xl:top-[10vw]' style={{ backgroundImage: `url(${IntroPhoto})`}}>

                        </div>

                        <div className='absolute flex items-center justify-center w-[70%] h-[10%] bg-[rgba(1,2,32,0.59)] top-[6rem] left-[1rem]  text-white text-[5vw] sm:top-[5rem] sm:left-[1rem] sm:text-[5vw] sm:rounded-[0_20rem_0_0] sm:top-[5rem] sm:w-[90%] sm:h-[25%] sm:left-0'>
                            <p>節約、簡単、未来</p>
                        </div>

                        <div className='absolute flex items-center justify-center w-[70%] h-[10%] bg-[rgba(1,2,32,0.59)] bottom-[6rem] right-[-8rem] text-white text-[3vw] sm:text-[2vw] sm:bottom-[9em] sm:right-[6rem] 2xl:bottom-[10em] 2xl:right-[10rem]'>
                            <p>
                                貯金節約の新たな生活を作る
                            </p>
                        </div>
                        <div className='absolute flex items-center justify-center w-[70%] h-[10%] bg-[rgba(1,2,32,0.59)] bottom-[3rem] right-[-6rem] text-white text-[3vw] sm:text-[2vw] sm:bottom-[6em] sm:right-[6rem] 2xl:bottom-[7em] 2xl:right-[10rem]'>
                            <p>
                                一目で簡単に確認できる機能
                            </p>
                        </div>
                        <div className='absolute flex items-center justify-center w-[70%] h-[10%] bg-[rgba(1,2,32,0.59)] bottom-[0rem] right-[-4rem] text-white text-[3vw] sm:text-[2vw] sm:bottom-[3em] sm:right-[6rem] 2xl:bottom-[4em] 2xl:right-[10rem]'>
                            <p>
                                緑の循環にする環境の守り
                            </p>
                        </div>

                        <div className=" absolute right-[15vw] bottom-[3em]  font-bold text-gray-800 w-[60%] h-[4vw] sm:right-[-40vw] sm:bottom-[1rem] sm:text-center 2xl:right-[10vw] 2xl:top-[19vw] 2xl:text-center ">
                            <button className='shadow-xl hover:bg-gray-500 hover:text-white w-[50%] h-full bg-white rounded-[20px] text-[3vw] sm:text-[2vw] '><Link href={route('register')}>Join Us!</Link></button>
                        </div>

                    </div>

                    {/*<div className='relative bg-cover bg-center w-full max-w-[1100px] h-[55vw] max-h-[45em] flex flex-col justify-end' style={{ backgroundImage: `url(${IntroPhoto})`}}>

                        <div className='absolute flex items-center justify-center w-[70%] h-[25%] bg-[rgba(1,2,32,0.59)] text-white text-[7vw] sm:text-[5vw] top-[10px] '>
                            <p>節約、簡単、未来</p>
                        </div>

                        <div className='absolute flex items-center justify-center w-[70%] h-[40%] bg-[rgba(1,2,32,0.59)] text-white text-[4vw] sm:text-[3vw] bottom-[10px] right-0'>
                            <p>
                                貯金節約の新たな生活を作る<br></br>
                                一目で簡単に確認できる機能<br></br>
                                緑の循環にする環境の守り
                            </p>
                        </div>

                    </div>*/}

                    <div id="news" className='relative flex items-center justify-center h-[56rem] top-[40rem] sm:top-[-2em] bg-blue-100 '>
                        <NewsComp news={news}/>

                    </div>

                    <div id="aboutus" className=' relative border bg-blue-200 top-[35rem] h-[59rem] sm:top-[-4em] '>

                        <div className=' absolute border bg-blue-950 w-[70vw] top-[15rem] h-[70vw] bottom-[20rem] rounded-[50rem] sm:rounded-l-[0em] sm:rounded-r-full sm:w-[50%] sm:h-[40vw] sm:top-[7rem] sm:bottom-[10rem]' >

                        <div className='absolute bg-cover bg-center hidden w-[119%] h-[40vw] flex flex-col justify-end top-[-1rem] right-[-20vw] sm:block sm:max-w-[35vw] sm:h-[25vw] sm:max-h-[25em] sm:right-[13vw] sm:top-[10vw] 2xl:h-[25em] 2xl:right-[13vw] 2xl:top-[8vw]' style={{ backgroundImage: `url(${funcPhoto})`}}>

                        </div>

                            <div className='absolute flex flex-col items-center justify-center w-[120%] h-[90%] bg-[rgba(255,255,255,0.8)] text-black text-[4vw] rounded-[30px] top-[1rem] right-[-30%] sm:text-[2vw] sm:w-[110%] sm:h-[80%] sm:right-[-85%] sm:top-[2rem]'>
                            <p className=' mb-4 text-[5vw] sm:text-[3vw] font-bold'>私たちに関しては</p>
                            <p>
                                私たちのチームは、食品廃棄物の削減と持続可能な消費を促進することに情熱を注いでいます。<br></br>
                                このプラットフォームを通じて、ユーザーが在庫を効率的に管理し、食品の無駄を減らすことに手助けをしたいと考えています。<br></br>
                                私たちは、技術とイノベーションの力を活用して、より持続可能な未来を築くことを目指しています。<br></br>
                                一緒に、より良い明日を作りましょう！
                            </p>
                        </div>
                        </div>

                    </div>
                </main>
            </MainLayout>
        </>


    );
}
