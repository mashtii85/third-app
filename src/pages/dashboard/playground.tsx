/* eslint-disable max-len */
import styled from 'styled-components'
import DocumentViewer from '../../components/common/docViewer/docViewer'
// import { Quiz } from '../../components/common/quiz/quiz'
// import { QUESTION_TYPE } from '../../types/lesson.d'

const PlaygroundPage = () => {
  return (
    <Wrapper>
      {/* <Quiz
        questions={[
          // {
          //   type: QUESTION_TYPE.ShortTextAnswer,
          //   questionText: 'please write "answer"',
          //   questionVideos: [
          //     {
          //       title: 'This is the video To Watch',
          //       desc: 'please write "answer" in the input box',
          //       src: 'https://file-examples-com.github.io/uploads/2017/04/file_example_MP4_640_3MG.mp4'
          //     }
          //   ],
          //   acceptableAnswers: ['answer']
          // },
          {
            type: QUESTION_TYPE.SelectAnswer,
            questionText: 'what the answer for 2 + 2 ?',
            correctAnswers: [0],
            answers: [
              {
                answerText: '4'
              },
              {
                answerText: '3'
              },
              {
                answerText: '2'
              },
              {
                answerText: '1'
              }
            ]
          },
          // {
          //   type: QUESTION_TYPE.SelectAnswer,
          //   questionText: 'what the answer for 1 + 2 ?',
          //   correctAnswers: [1],
          //   answers: [
          //     {
          //       answerText: '4'
          //     },
          //     {
          //       answerText: '3'
          //     },
          //     {
          //       answerText: '2'
          //     },
          //     {
          //       answerText: '1'
          //     }
          //   ]
          // },
          // {
          //   type: QUESTION_TYPE.SelectAnswer,
          //   questionText: 'select the image above',
          //   questionImage:
          //     'https://www.gardeningknowhow.com/wp-content/uploads/2020/12/lonely-japanese-cherry-400x300.jpg',
          //   answers: [
          //     {
          //       answerImage:
          //         'https://www.gardeningknowhow.com/wp-content/uploads/2020/12/lonely-japanese-cherry-400x300.jpg',
          //       answerText: 'this one is a tree'
          //     },
          //     {
          //       answerImage:
          //         'https://cdn-prod.medicalnewstoday.com/content/images/articles/322/322868/golden-retriever-puppy.jpg'
          //     },
          //     {
          //       answerImage:
          //         'https://carsguide-res.cloudinary.com/image/upload/f_auto,fl_lossy,q_auto,t_cg_hero_large/v1/editorial/story/hero_image/1908-Ford-Model-T_0.jpg'
          //     }
          //   ],
          //   correctAnswers: [0]
          // },
          {
            type: QUESTION_TYPE.SelectAnswer,
            questionText: 'which one can move?',
            answers: [
              {
                answerImage:
                  'https://www.gardeningknowhow.com/wp-content/uploads/2020/12/lonely-japanese-cherry-400x300.jpg',
                answerText: 'this one is a tree'
              },
              {
                answerImage:
                  'https://cdn-prod.medicalnewstoday.com/content/images/articles/322/322868/golden-retriever-puppy.jpg'
              },
              {
                answerImage:
                  'https://carsguide-res.cloudinary.com/image/upload/f_auto,fl_lossy,q_auto,t_cg_hero_large/v1/editorial/story/hero_image/1908-Ford-Model-T_0.jpg'
              }
            ],
            correctAnswers: [1, 2]
          }
        ]}
        onComplete={(data) => console.log({ data })}
      /> */}

      <DocumentViewer
        docs={[
          {
            uri: 'https://d1hk88326p7ilp.cloudfront.net/documents/6d981909-6410-4265-828a-8994b4630cc4.pptx'
          },
          {
            uri: 'https://cleverly-website.s3.eu-west-2.amazonaws.com/Cleverly_s_Predictions_for_2021_1610473562_b7d55c9671.pdf'
          }
        ]}
      />
    </Wrapper>
  )
}
const Wrapper = styled.div`
  width: 700px;
`
export default PlaygroundPage
