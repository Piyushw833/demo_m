
'use client';

import * as React from 'react';
import { MessageCircleHeart, Images, Feather } from 'lucide-react';
import PersonalizedMessage from '@/components/personalized-message';
import PhotoSlideshow from '@/components/photo-slideshow';
import StaticShayari from '@/components/static-shayari'; // Import the static component
import LandingPage from '@/components/landing-page'; // Import the LandingPage component
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Toaster } from '@/components/ui/toaster';

// Define girlfriend's name here or fetch from an environment variable/config
const GIRLFRIEND_NAME = 'Maitriii ❤️';
const YOUR_NAME = 'Piyush'; // Added your name

// Define photos for the slideshow.
// IMPORTANT: Ensure these files exist in the `/public/images/` directory.
// Check for exact filenames (case-sensitive) and extensions (.jpg).
const photos = [
  '/IMG-20250429-WA0112.jpg',
  '/IMG-20250429-WA0113.jpg',
  '/IMG-20250429-WA0114.jpg',
  '/IMG-20250429-WA0115.jpg',
  '/IMG-20250429-WA0116.jpg',
  '/IMG-20250429-WA0117.jpg',
  '/IMG-20250429-WA0118.jpg',
  '/IMG-20250429-WA0119.jpg',
  '/IMG-20250429-WA0120.jpg',
  '/IMG-20250429-WA0122.jpg',
  '/IMG-20250429-WA0123.jpg', 
  '/IMG-20250429-WA0124.jpg',
  '/IMG-20250429-WA0125.jpg',
  '/IMG-20250429-WA0126.jpg',
  '/IMG-20250429-WA0127.jpg',
  '/IMG-20250429-WA0128.jpg',
  '/IMG-20250429-WA0129.jpg',
  '/IMG-20250429-WA0131.jpg',
  '/IMG-20250429-WA0132.jpg',
  '/IMG-20250429-WA0133.jpg',
  '/IMG-20250429-WA0134.jpg',
];


// Define the multi-page message content
const messages = [
  // Page 1
  "Euuuu euuu euuuu My baby turning 21 damn Happy happy happy happy happiest birthdayyyyyyy to my 21 yr old hottiee😘❤",
  // Page 2
  "I know u were expecting this msg and here I am to make ur expectations complete🥰 Maitriiiiii happyyy birthday to youu babyyyy❤ Gifts will be given to youuu sooonnn dont worry about it. Aaj dunga kal dunga kehte kehte 1 sal nikal gya gift nai de paya me Maybe I am not completing ur expectations fully.😭.",
  // Page 3
  "Abhi thoda RR sunle, Yar me nai de pata hu mera 100% relationship me lekin dene ki koshish jarur krta hu Sachme kuch na kuch kam hote hai.",
  // Page 4
  "Anyways this is the something issue we are currently facing otherwise I hope there's no issue then. And I (we) will fix this soooon. I am so lucky to have you my motiii🥹 Bas me dikhata nai hu kyuki fir najar lg jati hai.",
  // Page 5
  "Me sachme tuzse pyar krta hu I did love you, I do love you and I will love you alwaysssss😩❤ Whatever is happening between us is just another phase of relationship.💞 So take it calm and we have to find peace in the relationship not chaos. I am happy that I am with you on your birthday consecutively 4th year😎 Thanks for let me be in your life.",
  // Page 6
  "Meri cutiieee, merii jaan, meri pyaari, meri pookieee, mera nandi bail, meri makadi, mera chain, meri pillu😂, meri 1000000000000000000000000000000 guna pyarrii pyarrii pyarrii baby ko janm din ki boht boht shubhkamnae",
  // Page 7
  "Jald hi tuze achi placement mil jae, jald hi tu acha idea dhunde, jald hi tu kuch crazy krde yehi meri bhagwan se prarthana hai Aur dher sara paisa kamaye aur muze party de 😩",
  // Page 8
  "Thank youu thank youu thank youuu so much for everything maitriiii tu boht sweet hai tu boht pyaaari hai tu boht caring hai tu boht achi hai pta nai kam pd jata hu me tuze khush rkhne me I am reallyyyy sorryyy for every single mistake I made and allow me to make more aur tuze gussa du 🤣 again sorryyy.",
  // Page 9
  "Yar tu gussa krte hue achi nai lgti hai isiliye kehta hu me gussa mt krte ja. Aur kuch nai hota hai yar ittu se bat me muze chimti le lete ja gussa nai krte ja fir wo batein bighad jati hai aur fir zagda.",
  // Page 10
  "Baki toh tere zulfein tere adae tera badan teri khushbho tere oth tera ye ani tera wo sab ekdm perfect package kya batau tuze Kitna acha lga tha muze jab tune surprise diya tha muze ghr aake nai bhula hu me Boht pyara lga tha muze jab tu khaterdari kr rhi thi meri nai bhula hu me Boht sexi lga tha muze jab tu soyi thi mere sath mere ghrpe a dream 🥹❤ Aur me tuze ek gift nai de paya 🫠",
  // Page 11
  " I am sorryyy lekin muze chod mt de me tuze ek sath boht gifts dunga fir tu pagal ho jaegi ki pehle gift kholu ki muze 🥰 Kya chumma leti hai meri item ekdm tadakta fadakta jan hi aa jati hai 😌 Aur tere stamina ko 🫡 200 topo ki salami! Crazy affection 💦🥰🤣",
  // Page 12
  " Bau hot che mari dikri su boilu tane Tane su dikkat che aau gusse hui jais bilkul mara mate gussa nai krvanu Badda pyara che apda bevanu to kem aavu karis KALE SHAME MILVNAU JAMECHE KE TANE MANE WISH KARVANU CHE BATAO MANE ane have sab bhuli jao hu je pn boilo chu Aais ke tane khabar ma bilkul bhi gusso nai krvanu",
  // Page 13
  "Etla pyari che mari motuuu tane upar gusso saras nai lage tu aavech saras lage che mane 😘😘😘😘😘 Dher saro badhiyao tane mubarak ho janamdine mate Ane tara mu ma 1000 kilo na cake mera mota sota pota lota kota 😭😭❤❤❤",
  // Page 14
  "I loveeee youuuu manuuu babbyyy 😘😘😘😘😘😘😘😘😘😘😘😘😘😘😘😘 Missssingg uuuuuu cant express🫠🥹 Taro dearest navra, Pissssss", // Corrected spelling
];


// Placeholder background music URL (replace with an actual audio file URL)
const backgroundMusicUrl = '/Phir_kya.mp3'; // Ensure you have this file in /public

// Define the static shayari text here
const STATIC_SHAYARI_TEXT = `
Tu ek chand ka tukda hai jispe dag nai hai
Tu ek chand ka tukda hai jispe dag nai hai
Tu jisme na ho wo fulon ka baug nai hai
Aur wo ful hi kya jo tuze dekhke sharma na jae
Aur wo ful hi kya jo tuze dekhke sharma na jae
Tere ye khubsurat chehre ka koi jawab nai hai😘`;

export default function SweetSurprisePage() {
  const [showLanding, setShowLanding] = React.useState(true);
  const [playMusic, setPlayMusic] = React.useState(false); // State to control music playback

  const handleLandingComplete = () => {
    setShowLanding(false);
    setPlayMusic(true); // Start music when landing page is complete
  };

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center p-6 md:p-12 bg-gradient-to-br from-background to-secondary">
        {showLanding ? (
          <LandingPage onComplete={handleLandingComplete} />
        ) : (
          <Card className="w-full max-w-2xl shadow-xl rounded-xl overflow-hidden animate-fade-in">
            <CardHeader className="bg-primary text-primary-foreground p-6 text-center">
              <CardTitle className="text-3xl font-bold tracking-tight">
                Happy Birthday Maitri Babyyy ❤️ {/* Updated title */}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Tabs defaultValue="message" className="w-full">
                <TabsList className="grid w-full grid-cols-3 rounded-none">
                  <TabsTrigger value="message" className="flex items-center gap-2 py-3 text-sm md:text-base">
                    <MessageCircleHeart className="w-5 h-5" /> Message
                  </TabsTrigger>
                  <TabsTrigger value="slideshow" className="flex items-center gap-2 py-3 text-sm md:text-base">
                    <Images className="w-5 h-5" /> Photos
                  </TabsTrigger>
                  <TabsTrigger value="shayari" className="flex items-center gap-2 py-3 text-sm md:text-base">
                    <Feather className="w-5 h-5" /> Shayari
                  </TabsTrigger>
                </TabsList>
                <div className="p-6">
                  <TabsContent value="message" className="animate-slide-in">
                     {/* Pass messages array and your name */}
                    <PersonalizedMessage girlfriendName={GIRLFRIEND_NAME} messages={messages} yourName={YOUR_NAME} />
                  </TabsContent>
                  <TabsContent value="slideshow" className="animate-slide-in">
                    {/* Pass the photos array and playMusic state */}
                    <PhotoSlideshow photos={photos} musicUrl={backgroundMusicUrl} playMusic={playMusic} />
                  </TabsContent>
                  <TabsContent value="shayari" className="animate-slide-in">
                    {/* Render the static shayari component */}
                    <StaticShayari shayariText={STATIC_SHAYARI_TEXT} />
                  </TabsContent>
                </div>
              </Tabs>
            </CardContent>
          </Card>
        )}
      </main>
      <Toaster />
    </>
  );
}
