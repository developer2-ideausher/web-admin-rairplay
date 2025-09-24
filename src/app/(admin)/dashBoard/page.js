"ue client";
import Card from "@/Components/Card";
import InstantTab from "@/Components/NotificationTabs.js/Instant";
import Title from "@/Components/Title";
import TopSongs from "@/Components/TopSongs";
import React from "react";

const page = () => {
  return (
    <div className="flex flex-col gap-4">
      <Title title="Dashboard" />
      <div className="grid 2xl:grid-cols-3 grid-cols-2 justify-between 2xl:gap-8 gap-4 mt-4">
        <Card
          mainTitle="Total Listens"
          Sub1="Monthly"
          num1="100"
          Sub2="Total"
          num2="200"
        />
        <Card
          mainTitle="Total Hours Listened"
          Sub1="Monthly"
          num1="100"
          Sub2="Total"
          num2="200"
        />
        {/* <Card
          mainTitle="Rairplay Score"
          Sub1="Monthly"
          num1="100"
          Sub2="Total"
          num2="200"
        /> */}
        <Card
          mainTitle="Total Reviews"
          Sub1="Monthly"
          num1="100"
          Sub2="Total"
          num2="200"
        />
      </div>
       <TopSongs />
    </div>
  );
};

export default page;
