import { allowedCollections } from "@/lib/types";
import { getFirstTopicFromCollection } from "@/actions/getCollectionData";
import LandingScrollerClient from "./landing_scroller_client"; // ✅ Import must match filename

const Landing_scroller = async () => {
  const allData = await Promise.all(
    allowedCollections.map(async (collection) => {
      const t = await getFirstTopicFromCollection(collection);
      return {
        ...t,
        collectionName: collection,
      };
    })
  );

  return (
    <div className="w-full flex justify-center my-6 py-3 bg-white/60 dark:bg-[#1f1f1f99] rounded shadow">
      <LandingScrollerClient allData={allData} />
    </div>
  );
};

export default Landing_scroller;
