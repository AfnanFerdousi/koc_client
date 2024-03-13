import { AdvertContent } from '@/components/home/advertContent';
import { Benefit } from '@/components/home/benefit';
import { FindWork } from '@/components/home/findWork';
import { PopularCategory } from '@/components/home/popularCategory';
import { Projects } from '@/components/home/projects';
import { Steps } from '@/components/home/steps';
import { TopContent } from '@/components/home/topContext';
import Mainlayout from '@/components/layouts/Mainlayout';
import { Stack } from '@mui/material';
import Head from 'next/head';
import React from 'react';

const Home = () => {
    return (
        <div>
            <Head>
                <title>KocFreelancing || Home</title>
            </Head>
            <Stack>
                <TopContent />
                <AdvertContent />
                <PopularCategory />
                <Projects />
                <Steps />
                <Benefit />
                <FindWork />
            </Stack>
        </div>
    );
};

export default Home;
Home.getLayout = function getLayout(page: any) {
    return <Mainlayout>{page}</Mainlayout>
}