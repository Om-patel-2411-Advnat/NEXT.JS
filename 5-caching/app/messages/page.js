import Messages from '@/components/messages';
import { getMessages } from '@/lib/messages';
import { unstable_noStore } from 'next/cache';

// this  will apply for whole file 
// now let's say we have multiple component who send the request so instead of setting the cache for every single one we can do it in more generic way 
// this revalidate is a reserved name and next js will explicitly look for it to set the value of the revalidation 
// export const revalidate = 5 ;

// you can also do this 
// this is another reserved name in next js this dynamic constant takes various values the default is 'auto'
// this is same as cache : 'no-store'
// this is also used to stop the route cache also (route cache means : while we use the next app in production it uses the cache data and not re-renders the route) 
// export const dynamic = 'force-dynamic';


export default async function MessagesPage() {

  // the another way and for that you can use this function build in next/cache 
  // here we will get the same functionality as cache: 'no-store' , and this will used for this entire component for any request that is being send from this component
  // unstable_noStore();

  // const response = await fetch('http://localhost:8080/messages', {

  //   // now let's see how to handle catch data 
  //   // next-14 use the catch data un-till you explicitly tell it to not use it for that you have to use catch method in fetch 
  //   // this is default in next version-14 this will force next application to use the aggressive cache behavior 
  //   // cache : 'force-cache'
  //   // this is used for sending new request every time and use new fetched data every time 
  //   // cache : 'no-store'

  //   // the alternative of revalidating cache data by using this
  //   // next : {
  //       // here we have to define a number for that much seconds next will use the cache data and after that throw away the cache and send new request and get some new data 
  //       // revalidate : 5 ,
  //   // }
  //   // next : {
  //   //   tags : ['msg'],
  //   // }


  //   // this is request memoization
  //   // this will cause sending different request for the same path because this only part of the request is changing 
  //   // after removing it from here and the layout.js of this folder it will send only one request for both 
  //   // headers: {
  //   //   'X-ID': 'page',
  //   // },
  // });
  // const messages = await response.json();

  const messages = await getMessages();

  if (!messages || messages.length === 0) {
    return <p>No messages found</p>;
  }

  return <Messages messages={messages} />;
}
