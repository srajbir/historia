import ExploreScroller from "./explore_scroller";
import { allowedCollections as collections } from '@/lib/types';
import Hero_section from "./hero_section";
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
