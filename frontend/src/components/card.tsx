import React, { useMemo } from 'react';
import { isNil } from 'remeda';
import { collapse } from '@growthops/ext-ts';
import { Heading, Text } from '@app/components';
import { CheckIcon } from '@heroicons/react/24/solid';

type CardProps = {
  image: string;
  image1: string;
  heading: string;
  heading4:string;
  content: string;
  contentGeneral:string;
  price: string;
  limit: string;
  information: any;
  isFramed?: boolean;
  isGeneral?: boolean;
  hasAutoHeight?: boolean;
  meta?: JSX.Element;
};

const generateRootClasses = (isFramed: boolean) => `
	overflow-hidden
	rounded
	h-full
	flex
	flex-col
	${isFramed ? 'bg-white shadow-lg' : ''}
  
`;

const generateBodyClasses = (isFramed: boolean) => `
	flex
	flex-col
	flex-grow
	${isFramed ? 'px-4 py-10' : ''}
`;

const generateMetaClasses = (hasAutoHeight: boolean) => `
	${hasAutoHeight ? 'mt-auto' : ''}
  mt-6
`;

const Card = ({
  image,
  image1,
  heading,
  heading4,
  content,
  contentGeneral,
  price,
  limit,
  meta,
  information,
  isGeneral,
  isFramed = false,
  hasAutoHeight = false,
}: CardProps) => {
  const classes = useMemo(
    () => ({
      root: collapse(generateRootClasses(isFramed)),
      image1: 'h-6 w-6',
      image: isFramed ? '' : 'rounded shadow-lg',

      body: collapse(generateBodyClasses(isFramed)),
      heading: '',
      heading4:"text-center",
      price: '',
      limit: 'text-[#6E7191] text-[16px] ml-2',
      content: 'mt-2 text-[#6E7191]',
      contentGeneral:"text-center !text-[13px] text-[#4E4B66] mt-2",
      meta: collapse(generateMetaClasses(hasAutoHeight)),
    }),
    [isFramed, hasAutoHeight]
  );

  return isGeneral ? (
   <div className='border border-[#D9DBE9] w-fit rounded-lg' style={{boxShadow: "0px 2px 22px rgba(0, 0, 0, 0.17), 0px 4px 30px rgba(7, 5, 5, 0.18)"}}>
      <img className={classes.image} src={image} />
      <div className={classes.body}>
      <div className='px-3 py-5'>
        <Heading
          className={classes.heading4}
          label={heading4}
          variant="heading-four"
        />
       
      
        <Text variant="text-small"  className={classes.contentGeneral} element="p" >
          {contentGeneral}
        </Text>
        </div>
      </div>
      </div>
  ) : (
    <article className={classes.root}>
      {/* <img className={classes.image} src={image} /> */}
      <div className={classes.body}>
        <Heading
          className={classes.heading}
          label={heading}
          variant="heading-four"
        />
        <Text className={classes.content} variant="text-regular">
          {content}
        </Text>
        <div className="flex items-center mt-4">
          <Heading label={price} variant="headline" element="p" />
          <sub className={classes.limit}>{limit}</sub>
        </div>
        {!isNil(meta) && <div className={classes.meta}>{meta}</div>}
        <div className="mt-8">
          {information.map((item: any) => (
            <div className="flex">
              <img className={classes.image1} src={image1} />
              <Text className="ml-2">{item.text}</Text>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
};

export default Card;

export type { CardProps };
