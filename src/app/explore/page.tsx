import ExploreScroller from "./explore_scroller";
import { allowedCollections as collections } from '@/lib/types';

const page = () => {

  return (
    <div>
      {collections.map((collection) => (
        <ExploreScroller
          key={collection}
          collectionName={collection}
          /> 
      ))}
    </div>
  );
};

export default page;
