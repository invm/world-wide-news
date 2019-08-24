import React, { useReducer } from 'react';
import axios from 'axios';
import NewsContext from './newsContext';
import NewsReducer from './newsReducer';
import {
  GET_NEWS,
  UPDATE_NEWS,
  SET_LOADING,
  SET_ALERT,
  REMOVE_ALERT
} from './../types';

const NewsState = props => {
  const initialState = {
    single: {},
    news: {
      headlines: [
        {
          source: {
            id: null,
            name: 'Bbc.com'
          },
          author: 'https://www.facebook.com/bbcnews',
          title:
            "Brexit: EU 'willing to listen' to Boris Johnson's ideas, says Donald Tusk - BBC News",
          description:
            'Donald Tusk says he "will not cooperate on no deal" ahead of Brexit talks with Boris Johnson on Sunday.',
          url: 'https://www.bbc.com/news/uk-politics-49458293',
          urlToImage:
            'https://ichef.bbci.co.uk/news/1024/branded_news/8F96/production/_108485763_hi056001709.jpg',
          publishedAt: '2019-08-24T10:44:08Z',
          content:
            'Image copyrightReutersImage caption\r\n European Council President Donald Tusk spoke at the G7 summit in France\r\nEuropean Council President Donald Tusk has said the EU is "willing to listen" to Prime Minister Boris Johnson\'s ideas for Brexit if they are "realis… [+2318 chars]'
        },
        {
          source: {
            id: 'politico',
            name: 'Politico'
          },
          author: 'ALEX ISENSTADT',
          title:
            'Haley-Pence rivalry heats up as GOP weighs post-Trump future - POLITICO',
          description:
            "Interviews with top Republicans reveal they're watching each other warily ahead of a potential 2024 showdown.",
          url:
            'https://www.politico.com/story/2019/08/24/haley-pence-rivalry-post-trump-1474377',
          urlToImage:
            'https://static.politico.com/89/56/6fb77248494792796d8c5735ab71/190823-pence-haley-gty-773.jpg',
          publishedAt: '2019-08-24T10:35:00Z',
          content:
            "Vice President Mike Pence and former U.N. Ambassador Nikki Haley have grabbed senior Republicans' attention as fodder for a possible 2024 primary showdown. | Spencer Platt/Getty Images\r\nWhen top Republicans convened at the St. Regis resort in Aspen, Colo. las… [+9286 chars]"
        },
        {
          source: {
            id: 'cnn',
            name: 'CNN'
          },
          author: 'Artemis Moshtaghian, CNN',
          title:
            'New Zealand teen with measles may have exposed hundreds at Disneyland and other tourist destinations - CNN',
          description:
            'A teenage girl traveling through Southern California may have exposed hundreds of people to the measles when she visited several popular tourist destinations, health officials said Friday.',
          url:
            'https://www.cnn.com/2019/08/24/health/new-zealand-teenager-measles-disneyland/index.html',
          urlToImage:
            'https://cdn.cnn.com/cnnnext/dam/assets/190824055421-disneyland-california-castle-super-tease.jpg',
          publishedAt: '2019-08-24T10:13:00Z',
          content:
            '(CNN)A teenage girl traveling through Southern California may have exposed hundreds of people to the measles when she visited several popular tourist destinations, health officials said Friday. \r\nThe girl, visiting from New Zealand, was contagious with the me… [+1547 chars]'
        },
        {
          source: {
            id: null,
            name: 'Youtube.com'
          },
          author: null,
          title:
            'A Spacecraft Is Going To Build Its Own Solar Panels In Space: Archinaut One - Fraser Cain',
          description:
            'As I’ve mentioned in several episodes now, humanity is in a bit of a transition period, a time when it makes sense to launch material up and out of Earth’s g...',
          url: 'https://www.youtube.com/watch?v=mDIDlEJUdlo',
          urlToImage: 'https://i.ytimg.com/vi/mDIDlEJUdlo/maxresdefault.jpg',
          publishedAt: '2019-08-24T00:22:51Z',
          content:
            'As Ive mentioned in several episodes now, humanity is in a bit of a transition period, a time when it makes sense to launch material up and out of Earths gravity well into orbit, and beyond. But its really expensive, costing up to $10,000 per pound you want i… [+1873 chars]'
        }
      ],
      business: [
        {
          source: {
            id: 'cnn',
            name: 'CNN'
          },
          author: 'Kevin Liptak, CNN',
          title:
            'Trump arrives for G7 summit as global disputes threaten unity - CNN',
          description:
            "As the global economy shudders, the Middle East boils and the Amazon rainforest burns, world leaders are convening on France's Atlantic coast for a weekend of talks few believe can solve any of it.",
          url:
            'https://www.cnn.com/2019/08/24/politics/g7-trump-global-slump/index.html',
          urlToImage:
            'https://cdn.cnn.com/cnnnext/dam/assets/190824074956-01-trump-g7-france-0824-super-tease.jpg',
          publishedAt: '2019-08-24T12:24:00Z',
          content:
            "Saint-Jean-de-Luz, France (CNN)As the global economy shudders, the Middle East boils and the Amazon rainforest burns, world leaders are convening on France's Atlantic coast for a weekend of talks few believe can solve any of it.\r\nPresident Donald Trump arrive… [+5029 chars]"
        },
        {
          source: {
            id: 'the-new-york-times',
            name: 'The New York Times'
          },
          author: null,
          title:
            'Trump Asserts He Can Force U.S. Companies to Leave China - The New York Times',
          description:
            'The president cited a national security law from 1977 that has never before been used to cut economic ties with a trading partner.',
          url:
            'https://www.nytimes.com/2019/08/24/world/europe/trump-g7-summit.html',
          urlToImage:
            'https://static01.nyt.com/images/2019/08/24/world/24prexy-sub/merlin_159641784_97e975bd-2a00-4dcd-926d-cd545baa5668-facebookJumbo.jpg',
          publishedAt: '2019-08-24T11:44:00Z',
          content:
            'Our great American companies are hereby ordered to immediately start looking for an alternative to China, including bringing our companies HOME and making your products in the USA, Mr. Trump tweeted, adding, We dont need China and, frankly, would be far bette… [+1236 chars]'
        },
        {
          source: {
            id: null,
            name: 'Townandcountrymag.com'
          },
          author: 'Chloe Foussianes',
          title:
            "Prince George & Princess Charlotte's Thomas's Battersea School Curriculum 2019 - TownandCountrymag.com",
          description:
            'Charlotte is just starting her first year there—but George is looking at a serious increase in homework.',
          url:
            'https://www.townandcountrymag.com/society/tradition/a28788911/prince-george-princess-charlotte-thomas-school-battersea-curriculum-2019/',
          urlToImage:
            'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/prince-george-of-cambridge-and-princess-charlotte-of-news-photo-1154780615-1566503996.jpg?crop=1.00xw:0.720xh;0,0.0943xh&resize=1200:*',
          publishedAt: '2019-08-24T11:00:00Z',
          content:
            "There are a lot of privileges that come with being born royal—but skipping out on homework isn't one of them.\r\nThis fall, four-year-old Princess Charlotte will get her first real taste of the academic life, and the work that comes with it. She's set to join h… [+1212 chars]"
        },
        {
          source: {
            id: null,
            name: 'Youtube.com'
          },
          author: null,
          title:
            'A Spacecraft Is Going To Build Its Own Solar Panels In Space: Archinaut One - Fraser Cain',
          description:
            'As I’ve mentioned in several episodes now, humanity is in a bit of a transition period, a time when it makes sense to launch material up and out of Earth’s g...',
          url: 'https://www.youtube.com/watch?v=mDIDlEJUdlo',
          urlToImage: 'https://i.ytimg.com/vi/mDIDlEJUdlo/maxresdefault.jpg',
          publishedAt: '2019-08-24T00:22:51Z',
          content:
            'As Ive mentioned in several episodes now, humanity is in a bit of a transition period, a time when it makes sense to launch material up and out of Earths gravity well into orbit, and beyond. But its really expensive, costing up to $10,000 per pound you want i… [+1873 chars]'
        }
      ],
      entertainment: [
        {
          source: {
            id: null,
            name: 'Bbc.com'
          },
          author: 'https://www.facebook.com/bbcnews',
          title:
            "Brexit: EU 'willing to listen' to Boris Johnson's ideas, says Donald Tusk - BBC News",
          description:
            'Donald Tusk says he "will not cooperate on no deal" ahead of Brexit talks with Boris Johnson on Sunday.',
          url: 'https://www.bbc.com/news/uk-politics-49458293',
          urlToImage:
            'https://ichef.bbci.co.uk/news/1024/branded_news/8F96/production/_108485763_hi056001709.jpg',
          publishedAt: '2019-08-24T10:44:08Z',
          content:
            'Image copyrightReutersImage caption\r\n European Council President Donald Tusk spoke at the G7 summit in France\r\nEuropean Council President Donald Tusk has said the EU is "willing to listen" to Prime Minister Boris Johnson\'s ideas for Brexit if they are "realis… [+2318 chars]'
        },
        {
          source: {
            id: 'politico',
            name: 'Politico'
          },
          author: 'ALEX ISENSTADT',
          title:
            'Haley-Pence rivalry heats up as GOP weighs post-Trump future - POLITICO',
          description:
            "Interviews with top Republicans reveal they're watching each other warily ahead of a potential 2024 showdown.",
          url:
            'https://www.politico.com/story/2019/08/24/haley-pence-rivalry-post-trump-1474377',
          urlToImage:
            'https://static.politico.com/89/56/6fb77248494792796d8c5735ab71/190823-pence-haley-gty-773.jpg',
          publishedAt: '2019-08-24T10:35:00Z',
          content:
            "Vice President Mike Pence and former U.N. Ambassador Nikki Haley have grabbed senior Republicans' attention as fodder for a possible 2024 primary showdown. | Spencer Platt/Getty Images\r\nWhen top Republicans convened at the St. Regis resort in Aspen, Colo. las… [+9286 chars]"
        },
        {
          source: {
            id: 'cnn',
            name: 'CNN'
          },
          author: 'Artemis Moshtaghian, CNN',
          title:
            'New Zealand teen with measles may have exposed hundreds at Disneyland and other tourist destinations - CNN',
          description:
            'A teenage girl traveling through Southern California may have exposed hundreds of people to the measles when she visited several popular tourist destinations, health officials said Friday.',
          url:
            'https://www.cnn.com/2019/08/24/health/new-zealand-teenager-measles-disneyland/index.html',
          urlToImage:
            'https://cdn.cnn.com/cnnnext/dam/assets/190824055421-disneyland-california-castle-super-tease.jpg',
          publishedAt: '2019-08-24T10:13:00Z',
          content:
            '(CNN)A teenage girl traveling through Southern California may have exposed hundreds of people to the measles when she visited several popular tourist destinations, health officials said Friday. \r\nThe girl, visiting from New Zealand, was contagious with the me… [+1547 chars]'
        },
        {
          source: {
            id: null,
            name: 'Youtube.com'
          },
          author: null,
          title:
            'A Spacecraft Is Going To Build Its Own Solar Panels In Space: Archinaut One - Fraser Cain',
          description:
            'As I’ve mentioned in several episodes now, humanity is in a bit of a transition period, a time when it makes sense to launch material up and out of Earth’s g...',
          url: 'https://www.youtube.com/watch?v=mDIDlEJUdlo',
          urlToImage: 'https://i.ytimg.com/vi/mDIDlEJUdlo/maxresdefault.jpg',
          publishedAt: '2019-08-24T00:22:51Z',
          content:
            'As Ive mentioned in several episodes now, humanity is in a bit of a transition period, a time when it makes sense to launch material up and out of Earths gravity well into orbit, and beyond. But its really expensive, costing up to $10,000 per pound you want i… [+1873 chars]'
        }
      ],
      health: [
        {
          source: {
            id: 'nbc-news',
            name: 'NBC News'
          },
          author: 'Victoria Knight, Kaiser Health News',
          title:
            'Years ago, this doctor linked a mysterious lung disease to vaping - NBC News',
          description:
            'In 2015, a doctor in West Virginia had a patient with vape-linked breathing problems. He wrote a case report describing what happened.',
          url:
            'https://www.nbcnews.com/health/health-news/years-ago-doctor-linked-mysterious-lung-disease-vaping-n1045801',
          urlToImage:
            'https://media1.s-nbcnews.com/j/newscms/2019_34/2983121/190823-vaping-al-1154_d430357166faa273bfac26f026b4a20d.nbcnews-fp-1200-630.jpg',
          publishedAt: '2019-08-24T09:57:00Z',
          content:
            'Dr. John E. Parker was working at a West Virginia hospital in 2015 when a 31-year-old female patient was admitted with acute respiratory problems. A team of doctors ultimately suspected that her mysterious case of lipoid pneumonia might be related to vaping a… [+5371 chars]'
        },
        {
          source: {
            id: null,
            name: 'Sciencealert.com'
          },
          author: 'Lena Sun, The Washington Post',
          title:
            'The First Person Has Died From a Mysterious Lung Illness Linked to Vaping - ScienceAlert',
          description:
            'Illinois officials said Friday that a person who had recently used an e-cigarette and was hospitalized with severe lung illness had died.',
          url:
            'https://www.sciencealert.com/a-mysterious-lung-illness-has-been-linked-to-vaping-and-the-first-person-has-died',
          urlToImage:
            'https://www.sciencealert.com/images/2019-08/processed/vapingdeath_1024.jpg',
          publishedAt: '2019-08-24T09:55:30Z',
          content:
            'Illinois officials said Friday that a person who had recently used an e-cigarette and was hospitalized with severe lung illness had died.\r\nThe death appears to be the first among a spate of mysterious lung illnesses now under investigation by state and federa… [+3870 chars]'
        },
        {
          source: {
            id: 'engadget',
            name: 'Engadget'
          },
          author: 'Richard Lawler',
          title: "Lamborghini teaser hints at a hybrid 'hypercar' - Engadget",
          description:
            "Remember Lamborghini's electrified Terzo Millennio concept? A production version may be around the corner.",
          url:
            'https://www.engadget.com/2019/08/24/lamborghini-terzo-millennio-hybrid-frankfurt/',
          urlToImage:
            'https://o.aolcdn.com/images/dims?thumbnail=1200%2C630&quality=80&image_uri=https%3A%2F%2Fo.aolcdn.com%2Fimages%2Fdims%3Fresize%3D2000%252C2000%252Cshrink%26image_uri%3Dhttps%253A%252F%252Fs.yimg.com%252Fos%252Fcreatr-uploaded-images%252F2019-08%252F2a8356b0-c64e-11e9-bf71-0f5312c737b2%26client%3Da1acac3e1b3290917d92%26signature%3D12a0aa3ef6e7b68ec2f6786d2e2e5c081f052998&client=amp-blogside-v2&signature=fe25261c70617e5a95844d37076749932dde486f',
          publishedAt: '2019-08-24T09:43:04Z',
          content:
            "Ever since Lamborghini showed off its wild MIT-collaborated Terzo Millennio concept we've been waiting to see what a production version could look like, and we might find out soon.Autoblog points out this teaser image posted to the company's Instagram page wh… [+650 chars]"
        },
        {
          source: {
            id: null,
            name: 'Youtube.com'
          },
          author: null,
          title:
            'A Spacecraft Is Going To Build Its Own Solar Panels In Space: Archinaut One - Fraser Cain',
          description:
            'As I’ve mentioned in several episodes now, humanity is in a bit of a transition period, a time when it makes sense to launch material up and out of Earth’s g...',
          url: 'https://www.youtube.com/watch?v=mDIDlEJUdlo',
          urlToImage: 'https://i.ytimg.com/vi/mDIDlEJUdlo/maxresdefault.jpg',
          publishedAt: '2019-08-24T00:22:51Z',
          content:
            'As Ive mentioned in several episodes now, humanity is in a bit of a transition period, a time when it makes sense to launch material up and out of Earths gravity well into orbit, and beyond. But its really expensive, costing up to $10,000 per pound you want i… [+1873 chars]'
        }
      ],
      science: [
        {
          source: {
            id: 'fox-news',
            name: 'Fox News'
          },
          author: 'Danielle Wallace',
          title:
            "Florida gun owner who claimed self-defense convicted in 'Stand Your Ground' case - Fox News",
          description:
            'In a case that brought national attention to Florida’s  "Stahnd Your Ground" gun law, a jury on Friday night convicted a licensed gun owner on manslaughter charges after deliberating for six hours folowing a weeklong trial.',
          url:
            'https://www.foxnews.com/us/florida-michael-drejka-second-amendment-guilty-manslaughter-mcglockton',
          urlToImage:
            'https://static.foxnews.com/foxnews.com/content/uploads/2019/08/drejka-mugshot-84529.png',
          publishedAt: '2019-08-24T09:41:12Z',
          content:
            'In a case that brought national attention to Florida’s  "Stand Your Ground" gun law, a jury on Friday night convicted a licensed gun owner on manslaughter charges after deliberating for six hours following a weeklong trial.\r\nThe defendant, Michael Drejka, was… [+3790 chars]'
        },
        {
          source: {
            id: 'the-new-york-times',
            name: 'The New York Times'
          },
          author: null,
          title:
            'One Crazy Day Showed How Political Chaos Threatens the World Economy - The New York Times',
          description:
            'An escalating trade war and unpredictable policy shifts. Also, tweets.',
          url:
            'https://www.nytimes.com/2019/08/24/upshot/global-economy-political-chaos-risk.html',
          urlToImage:
            'https://static01.nyt.com/images/2019/08/23/upshot/up-econ/up-econ-facebookJumbo.jpg',
          publishedAt: '2019-08-24T09:00:00Z',
          content:
            'The implicit message: If erratic trade policy undermines the economy, the Feds tools are likely to have only limited ability to overcome the damage. Interest rate cuts in that situation would be like giving pain relievers to someone with a broken bone better … [+1619 chars]'
        },
        {
          source: {
            id: null,
            name: '411mania.com'
          },
          author: null,
          title:
            'Disney Reveals New Photo Stills for The Mandalorian for D23 Expo, New Characters Officially Named - 411mania.com',
          description:
            'Disney has revealed a bunch of new photo stills for The Mandalorian showing IG-11, Mos Gideon, The Mandalorian himself and a whole lot more.',
          url:
            'https://411mania.com/movies/disney-mandalorian-photo-stills-d23-expo/',
          urlToImage:
            'https://411mania.com/wp-content/uploads/2019/08/IG-11-150x150.jpg',
          publishedAt: '2019-08-24T07:21:13Z',
          content:
            'At yesterday’s blockbuster Disney+ Showcase, Lucasfilm and Disney revealed the official trailer for the highly anticipated, episodic, live-action Star Wars television series, The Mandalorian. Disney and Lucasfilm also provided us with some new photo stills fr… [+1383 chars]'
        },
        {
          source: {
            id: null,
            name: 'Youtube.com'
          },
          author: null,
          title:
            'A Spacecraft Is Going To Build Its Own Solar Panels In Space: Archinaut One - Fraser Cain',
          description:
            'As I’ve mentioned in several episodes now, humanity is in a bit of a transition period, a time when it makes sense to launch material up and out of Earth’s g...',
          url: 'https://www.youtube.com/watch?v=mDIDlEJUdlo',
          urlToImage: 'https://i.ytimg.com/vi/mDIDlEJUdlo/maxresdefault.jpg',
          publishedAt: '2019-08-24T00:22:51Z',
          content:
            'As Ive mentioned in several episodes now, humanity is in a bit of a transition period, a time when it makes sense to launch material up and out of Earths gravity well into orbit, and beyond. But its really expensive, costing up to $10,000 per pound you want i… [+1873 chars]'
        }
      ],
      sports: [
        {
          source: {
            id: null,
            name: 'Espn.com'
          },
          author: null,
          title: 'Australia stuns Team USA, snaps 78-game streak - ESPN',
          description:
            "The U.S. men's basketball team lost for the first time in nearly 13 years, falling to Australia 98-94 in a pre-World Cup exhibition game Saturday.",
          url:
            'https://www.espn.com/olympics/basketball/story/_/id/27450965/australia-stuns-team-usa-snaps-78-game-streak',
          urlToImage:
            'https://a3.espncdn.com/combiner/i?img=%2Fphoto%2F2019%2F0824%2Fr587942_1296x729_16%2D9.jpg',
          publishedAt: '2019-08-24T06:53:16Z',
          content:
            'MELBOURNE, Australia -- The World Cup is a week away, and the United States is no lock for gold.\r\nAustralia delivered that message to the world Saturday.\r\nFor the first time in nearly 13 years, a U.S. roster of NBA players played an international game -- and … [+5321 chars]'
        },
        {
          source: {
            id: null,
            name: 'Nintendolife.com'
          },
          author: 'Nintendo Life',
          title:
            'The Persona Series Has Now Sold More Than 10 Million Copies Worldwide - Nintendo Life',
          description: 'No joke',
          url:
            'http://www.nintendolife.com/news/2019/08/the_persona_series_has_now_sold_more_than_10_million_copies_worldwide',
          urlToImage:
            'http://images.nintendolife.com/41bbc695c3669/1280x720.jpg',
          publishedAt: '2019-08-24T04:25:00Z',
          content:
            "Alright. I can sense the types of comments this thread is about to be bombarded with so let me explain.\r\nPersona 5 on the Switch seems possible, but is literally impossible considering Atlus Japan's stance on their IPs going multiplatform. Since the original … [+3346 chars]"
        },
        {
          source: {
            id: 'al-jazeera-english',
            name: 'Al Jazeera English'
          },
          author: 'Al Jazeera',
          title:
            "Brazil's Bolsonaro sends army to fight Amazon fires - Al Jazeera English",
          description:
            'As EU threatens trade retaliation, the far-right leader announces he has authorised troops to help contain raging fires.',
          url:
            'https://www.aljazeera.com/news/2019/08/brazil-bolsonaro-sends-army-fight-amazon-fires-190823215538767.html',
          urlToImage:
            'https://www.aljazeera.com/mritems/Images/2019/8/23/a69eabba172a4d1ba10a459c0e6efaab_18.jpg',
          publishedAt: '2019-08-24T03:31:00Z',
          content:
            "Following a global chorus of concern and condemnation, Brazil's far-right President Jair Bolsonaro has pledged to mobilise the army to help combat fires that have been ravaging large parts of the Amazon rainforest, while his administration launched a diplomat… [+8554 chars]"
        },
        {
          source: {
            id: null,
            name: 'Youtube.com'
          },
          author: null,
          title:
            'A Spacecraft Is Going To Build Its Own Solar Panels In Space: Archinaut One - Fraser Cain',
          description:
            'As I’ve mentioned in several episodes now, humanity is in a bit of a transition period, a time when it makes sense to launch material up and out of Earth’s g...',
          url: 'https://www.youtube.com/watch?v=mDIDlEJUdlo',
          urlToImage: 'https://i.ytimg.com/vi/mDIDlEJUdlo/maxresdefault.jpg',
          publishedAt: '2019-08-24T00:22:51Z',
          content:
            'As Ive mentioned in several episodes now, humanity is in a bit of a transition period, a time when it makes sense to launch material up and out of Earths gravity well into orbit, and beyond. But its really expensive, costing up to $10,000 per pound you want i… [+1873 chars]'
        }
      ],
      technology: [
        {
          source: {
            id: 'the-hill',
            name: 'The Hill'
          },
          author: 'Brett Samuels',
          title:
            "Trump on North Korean projectile launches: Kim 'likes testing missiles' | TheHill - The Hill",
          description:
            'President Trump on Friday said he does not believe North Korean leader Kim Jong Un violated...',
          url:
            'https://thehill.com/homenews/administration/458646-trump-on-north-korean-projectile-launches-kim-likes-testing-missiles',
          urlToImage:
            'https://thehill.com/sites/default/files/donaldtrump_kimjongun_06302019.jpg',
          publishedAt: '2019-08-24T03:17:40Z',
          content:
            "President TrumpDonald John TrumpThe Hill's Campaign Report: Democratic field begins to shrink ahead of critical stretchTo ward off recession, Trump should keep his mouth and smartphone shutTrump: 'Who is our bigger enemy,' Fed chief or Chinese leader?MORE on … [+1992 chars]"
        },
        {
          source: {
            id: 'the-new-york-times',
            name: 'The New York Times'
          },
          author: null,
          title:
            '2 Former Houston Police Officers Charged in Connection With Fatal Raid - The New York Times',
          description:
            'Prosecutors said the officers fabricated information to obtain a warrant for the raid, in which a man and a woman were killed.',
          url:
            'https://www.nytimes.com/2019/08/23/us/houston-police-drug-raid.html',
          urlToImage:
            'https://static01.nyt.com/images/2019/08/23/us/23xp-houston/23xp-houston-facebookJumbo.jpg',
          publishedAt: '2019-08-24T01:49:00Z',
          content:
            'Michael P. Doyle, a lawyer for Ms. Nicholass family, said in a statement on Friday that the indictments were important developments but they should be only the beginning of the pursuit of justice.\r\nThe Houston Police Department did not immediately respond to … [+1095 chars]'
        },
        {
          source: {
            id: null,
            name: 'Npr.org'
          },
          author: '',
          title:
            'Justice Department Plans To Expand Its Power Over Immigration Courts - NPR',
          description:
            "The changes follow the Trump administration's efforts to decertify the immigration judges' union and speed up deportations.",
          url:
            'https://www.npr.org/2019/08/23/753912351/doj-increases-power-of-agency-running-immigration-court-system',
          urlToImage:
            'https://media.npr.org/assets/img/2019/08/23/ap_18264654392861_wide-af130cf2b39e784f3bc7d82ba580bb24b58c93d3.jpg?s=1400',
          publishedAt: '2019-08-24T00:46:00Z',
          content:
            "Ashley Tabaddor, a federal immigration judge in Los Angeles, is the president of the National Association of Immigration Judges.\r\nSusan Walsh/AP\r\nThe Trump administration is making changes to the agency that operates the nation's immigration court system, a m… [+2528 chars]"
        },
        {
          source: {
            id: null,
            name: 'Abc15.com'
          },
          author: 'https://www.abc15.com/about-us/staff/abc15-com-staff',
          title:
            'Health department: Teen competing in World Hip Hop Championship at Arizona Grand Resort had measles - ABC15 Arizona',
          description:
            'An international teenager who came to Phoenix to compete in the World Hip Hop Dance Championships in August was infected with measles and may have exposed others to the disease.',
          url:
            'https://www.abc15.com/news/region-phoenix-metro/central-phoenix/health-department-teen-competing-in-world-hip-hop-championship-at-arizona-grand-resort-had-measles',
          urlToImage:
            'https://ewscripps.brightspotcdn.com/dims4/default/c0460e6/2147483647/strip/true/crop/1280x672+0+24/resize/1200x630!/quality/90/?url=https%3A%2F%2Fx-default-stgec.uplynk.com%2Fausw%2Fslices%2F7a9%2F5c3d34b8b29a45469a86c02775b7a2cf%2F7a937b0a25ee4d13984bf5ec5d98a41f%2Fposter_62ce1e735f394ab692834ff3861cfe33.jpg',
          publishedAt: '2019-08-24T00:06:00Z',
          content:
            'PHOENIX An international teen girl who came to Phoenix to compete in the World Hip Hop Dance Championships at the Arizona Grand Resort in August was infected with measles and may have exposed others to the disease, the Maricopa County Department of Health and… [+2901 chars]'
        }
      ]
    },
    newerNews: false,
    alert: null,
    loading: false
  };

  const [state, dispatch] = useReducer(NewsReducer, initialState);

  const setSingle = () => {};

  const getNews = () => {
    setLoading();

    // Go to fb and get news and put the into state and save the date of the last update
    // Go to news api and check if there are newer news, if so, display alert to update news
  };

  //   //Search users
  //   const searchUsers = async text => {
  //     setLoading();
  //     const res = await axios.get(
  //       `https://api.github.com/search/users?q=${text}&client_id=
  //       ${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=
  //       ${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
  //     );
  //     dispatch({
  //       type: SEARCH_USERS,
  //       payload: res.data.items
  //     });
  //   };

  //   //Get single user
  //   const getUser = async username => {
  //     setLoading();
  //     const res = await axios.get(
  //       `https://api.github.com/users/${username}?client_id=
  //       ${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=
  //       ${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
  //     );
  //     dispatch({ type: GET_USER, payload: res.data });
  //   };

  //   //Get repos
  //   const getUserRepos = async username => {
  //     setLoading();
  //     const res = await axios.get(
  //       `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=
  //       ${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=
  //       ${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
  //     );
  //     dispatch({ type: GET_REPOS, payload: res.data });
  //   };

  //Set loading
  const setLoading = () => dispatch({ type: SET_LOADING });

  return (
    <NewsContext.Provider
      value={{
        news: state.news,
        newerNews: state.newerNews,
        alert: state.alert,
        loading: state.loading,
        setLoading,
        getNews
      }}>
      {props.children}
    </NewsContext.Provider>
  );
};

export default NewsState;
