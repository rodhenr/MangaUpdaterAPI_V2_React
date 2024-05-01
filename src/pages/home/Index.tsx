import { useContext, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import SpinLoading from '../../components/loading/SpinLoading';
import AuthContext from '../../shared/context/AuthContext';
import { useGetMangasInfiniteQuery } from './api/Queries';
import CardView from './components/CardView';
import Header from './components/Header';
import ListView from './components/ListView';
import './styles/Home.scss';

const Home = () => {
    const [isCardView, setIsCardView] = useState<boolean>(true);
    const { userInfo } = useContext(AuthContext);
    const { ref, inView } = useInView();

    const { data, error, hasNextPage, isPending, fetchNextPage } = useGetMangasInfiniteQuery(16);

    useEffect(() => {
        if (inView && hasNextPage) {
            fetchNextPage();
        }
    }, [fetchNextPage, inView, hasNextPage, data]);

    if (error) return <div>Error</div>;

    return (
        <>
            <div className="flex column gap-4 h-100 w-100">
                {<Header isCardView={isCardView} setIsCardView={setIsCardView} />}
                {!userInfo.token ? (
                    <div className="flex-center column gap-2 mt-6">
                        <p className="fsize-6">Login to start following mangas</p>
                    </div>
                ) : isPending ? (
                    <SpinLoading />
                ) : (
                    <>
                        {data && data.pages.length > 0 ? (
                            isCardView ? (
                                <CardView data={data.pages} />
                            ) : (
                                <ListView data={data.pages} />
                            )
                        ) : (
                            <div>You are not following any manga!</div>
                        )}
                    </>
                )}
            </div>
            <div ref={ref}></div>
        </>
    );
};

export default Home;
