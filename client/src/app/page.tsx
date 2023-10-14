import { Header } from '@/components/Header';
import { Filter } from '@/components/Filter';
import { ViewButton } from '@/components/ViewButton';
import { TimeButton } from '@/components/TimeButton';

export default function Home() {
    return (
        <>
            {/* <Header /> */}
            <Filter />
            <ViewButton />
            <TimeButton />
        </>
    );
}
