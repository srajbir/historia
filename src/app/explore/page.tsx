import ExploreScroller from "../../components/explore_scroller";
import { allowedCollections as collections } from '@/lib/types';
import Hero_section from "../../components/hero_section";
const page = () => {

  return (
    <>
      <Hero_section search={true} filter={true}/>
        {collections.map((collection) => (
          <ExploreScroller
          key={collection}
          collectionName={collection}
          /> 
        ))}
    </>
  );
};

export default page;
