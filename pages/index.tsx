import React, { useCallback, useState } from 'react'
import algoliasearch from "algoliasearch";
import {
  Configure,
  Hits,
  HitsProps,
  InstantSearch,
  Pagination,
  SearchBox,
  SearchBoxProps,
  useInstantSearch,
} from "react-instantsearch-hooks-web";
import PostItem from '@/components/post-item';
import Update from './update';

const searchClient = algoliasearch(
  "J0TGB8Y5YU",
  "54e16b8d6a82a516e1de8970996ba623"
);

interface PostProps {
  post: {
    img: string;
    // 他にも必要なプロパティがあればここに追加
  };
}

const Search: React.FC<PostProps> = ({ post }) => {

  const search: SearchBoxProps["queryHook"] = (query, hook) => {
    console.log("検索実行",hook(query));
    if(query.trim()) {
      setWord(query);
      setCurrentHook(() => hook);
      hook(query);
    }
  };

  const [word, setWord] = useState<string>();
  const [currentHook, setCurrentHook] = useState<any>();

  const [onSearch, setOnSearch] = useState<boolean>(true);

  const changeOnSearch = () => {
    setOnSearch(!onSearch);
  }

  const onImageUpload = useCallback(() => {
    console.log(currentHook,word)
    if(word)search(word,currentHook);
  }, [search]);

  return (
    <div className=' container-sm'>
      <InstantSearch indexName="post_pop" searchClient={searchClient}>
      {onSearch &&
          <div className='cover'>
            <div className='search__box'>
              <img className='logo__img' src="logo2.png"></img>
              <div className=' flex'>
          <SearchBox
                  queryHook={search}
          classNames={{
            root: "w-2/3",
            input: "form__search",
            submitIcon: "hidden",
            resetIcon: "hidden",
          }}
                />
                <span className=' flex-1'></span>
        <button onClick={changeOnSearch} className='form__submit'>検索</button>
              </div>
            </div>
          </div> ||
          <div className='content'>
            <p className='backBtn' onClick={changeOnSearch}>←</p>
          <img className='head__img' src="logo2.png"></img>
          <p className='text-center text-2xl my-4 border-black border-b w-fit m-auto'>{word}</p>
          <Update title={word} onImageUpload={onImageUpload} />
          <Configure hitsPerPage={20} />
          <div className="flex">
    <ol className="ais-Hits-list flex w-full">
      <Hits hitComponent={({ hit }) => {
  // hitオブジェクトがimgプロパティを持っているか確認してからPostItemコンポーネントに渡す
  if (hit.img) {
    return <PostItem post={hit} />;
  }
  // imgプロパティがない場合のフォールバック処理（例：何も描画しない、エラーメッセージを表示する等）
  return null;
}} />
    </ol>
  </div>
          </div>}
      </InstantSearch>
    </div>
  )
}

export default Search
