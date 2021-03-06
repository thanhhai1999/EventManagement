import React, { useState, useEffect } from "react";
import axios from "axios";
import ContainerLarge from "./Container-large";
import Sponsor from "./Sponsor";
import SpeakersContainer from "../Speakers/SpeakerContainer";
import Quote from "./Quote";
import Banner from "./Banner";
function Home() {
    const [speakers, setSpeakers] = useState([]);

  useEffect(() => {
    axios.get('https://event-management-hcmute.herokuapp.com/api/speakers')
    .then(res => {
      setSpeakers(res.data);
      
    })
    .catch(error => {
      console.log(error)
    })
  }, [])
  return (
    <div class="bg-white">
      <div className="flex flex-col justify-center items-center">
        <ContainerLarge />
        
        <Banner/>
        <h2 class="w-screen flex pl-52 text-4xl font-extrabold leading-10 tracking-tight text-left text-gray-900 sm:text-5xl sm:leading-none md:text-6xl sm:text-center mb-24">
        Who's <span class="inline-block text-indigo-500 pl-4">Speaking</span>
      </h2>
        <SpeakersContainer speakers={speakers}/>
        
        <Sponsor />
        <Quote/>
      </div>
    </div>
  );
}
export default Home;
