import React from 'react';
import { format, differenceInMinutes, differenceInDays, formatDistanceToNow } from 'date-fns';
import Profileimg from './Profileimg';

const ProfileTitle = ({ avater, time="2024-01-18T07:49:43.261Z", fullname, classname }) => {

  const postDate = new Date(time);
  const now = new Date();

  const timeDifferenceInMinutes = differenceInMinutes(now, postDate);
  const timeDifferenceInDays = differenceInDays(now, postDate);

  let formattedTime;
  if (timeDifferenceInMinutes < 1) {
    formattedTime = 'Just now';}
 else if (timeDifferenceInMinutes < 60) {
    formattedTime = `${timeDifferenceInMinutes}m ago`;
  } else if (timeDifferenceInDays < 1) {
    formattedTime = `${Math.floor(timeDifferenceInMinutes / 60)}hrs ago`;
  } else if (timeDifferenceInDays < 7) {
    formattedTime = `${timeDifferenceInDays}d ago`;
  } else {
    formattedTime = format(postDate, 'MMM d');
  }

  return (
    <div className="flex gap-1 items-center">
      <div className=''><Profileimg avater={avater}  classname={classname}/></div>
      <div>
        <div className='text-sm font-normal text-[#333333] ca'>{fullname}</div>
        <div className='postmargin text-sm font-light text-[#777777]'>{formattedTime}</div>
      </div>
    </div>
  );
};

export default ProfileTitle;
