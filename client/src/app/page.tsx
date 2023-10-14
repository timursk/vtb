import { Header } from '@/components/Header';
import { Filter } from '@/components/Filter';
import { ViewButton } from '@/components/ViewButton';
import { TimeButton } from '@/components/TimeButton';
import { AtmsFilter } from '@/components/AtmsFilter';

export default function Home() {
    return (
        <>
            {/* <Header /> */}
            <Filter />
            <ViewButton />
            <TimeButton />
            {/* <AtmsFilter /> */}
        </>
    );
}
