import {React, useContext} from 'react'
import Section from './Section'
import CollectionCards from './CollectionCards'
import context from "../Context/context"

const CollectionsList = () => {
  const [data,setData] = useContext(context).data;
  const [collectionCardPopupData, setCollectionCardPopupData] = useContext(context).collectionPopup;
  const [isCollectionPopupOpen, setIsCollectionPopupOpen] = useContext(context).collectionPopupOpen;
  const [isCollectionPopupVoteDisabled, setIsCollectionPopupVoteDisabled] = useContext(context).popupVoteDisabled;
  async function onCollectionCardClicked( data )
  {
    setIsCollectionPopupVoteDisabled(false);
    setIsCollectionPopupOpen(true);  
    setCollectionCardPopupData(data);
  }

  return (
    <Section crosses customPaddings className="pt-[6rem] -mt-[5.25] px-[7rem] mb-[3rem]" >
        <div className='relative pb-[4rem]'>
            <h2 className='h2'>Recently Listed Collections:</h2>
        </div>
        <div id = "Collections List" className='relative flex space-x-[3rem] overflow-x-scroll  '>
            {data.map((item, index) => (
                <CollectionCards 
                  key = {item.collection_id}
                  className="hover:scale-90 transition-transform delay-[5] duration-[50] ease-in-out" 
                  img = {item.url}
                  CollectionName={item.name}
                  artist={item.artist}
                  votes = {item.voters.length}
                  onClick={() => onCollectionCardClicked({
                    collectionId: item.collection_id.toNumber(),
                    tokenId: item.token_id.toNumber(),
                    collectionName: item.name,
                    voters: item.voters})}
                />
            ))}
        </div>
    </Section>
  )
}

export default CollectionsList