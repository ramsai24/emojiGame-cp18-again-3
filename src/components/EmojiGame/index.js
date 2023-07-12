// Quick Tip

//  - Use the below function in the EmojiGame Component to shuffle the emojisList every time when an emoji is clicked.

// Write your code here.
import {Component} from 'react'
import './index.css'
import NavBar from '../NavBar'
import EmojiCard from '../EmojiCard'
import WinOrLoseCard from '../WinOrLoseCard'

let Lst

const shuffledEmojisList = emojisList =>
  // const {emojisList} = this.props
  emojisList.sort(() => Math.random() - 0.5)

class EmojiGame extends Component {
  state = {score: 0, topScore: 0, emojisLists: this.props, id: '', listOfId: []}

  emojiClick = ids => {
    console.log(ids)
    const {id, emojisLists, listOfId} = this.state
    console.log(listOfId)
    // const emojisList = {
    //   emojisList: this.shuffledEmojisList(emojisLists.emojisList),
    // }
    // console.log(emojisList)

    // emojisLists: {emojisList}this.setState({emojisLists: {emojisList}})
    // this.setState({
    //   id: ids,
    // })

    if (!listOfId.includes(ids)) {
      // if (score < emojisList.length) {
      this.setState(prev => ({
        emojisLists: {
          emojisList: shuffledEmojisList(emojisLists.emojisList),
        },
        score: prev.score + 1,
        id: ids,
        listOfId: [...prev.listOfId, ids],
      }))
      //  }
      //   else {
      //     ;<WinOrLoseCard scoreBoard={{score, topScore, emojisList}} />
      //   }
    } else {
      console.log('game failed')
      Lst = emojisLists
      this.setState({listOfId: []})
    }
  }

  playAgain = (score, topScore) => {
    const {emojisLists} = this.state
    if (score === emojisLists.emojisList.length) {
      this.setState({score: 0, topScore: 0})
    } else {
      if (score > topScore) {
        console.log('modifiying')
        this.setState({
          score: 0,
          topScore: score,
          emojisLists: {
            emojisList: shuffledEmojisList(emojisLists.emojisList),
          },
          id: '',
        })
      }
      //   else if (score > topScore) {
      //     this.setState({score: 0, topScore: score})
      //   }
      this.setState(prev => ({
        score: 0,
        topScore: prev.topScore,
        emojisLists: {
          emojisList: shuffledEmojisList(emojisLists.emojisList),
        },
        id: '',
      }))

      // this.setState({score: 0, topScore: score})
    }
  }

  render() {
    const {score, topScore, emojisLists} = this.state
    // const {emojisList} = this.props
    console.log(emojisLists)
    console.log(this.state)
    console.log(Lst === emojisLists)
    const check = Lst === emojisLists
    console.log(check)

    if (Lst !== emojisLists) {
      console.log(check)
      return (
        <div className="app-container">
          <div className="bg-container">
            <div>
              {score === emojisLists.emojisList.length ? (
                <div>
                  <NavBar scoreDetails={{score, topScore, check}} />
                  <WinOrLoseCard
                    scoreBoard={{score, topScore, emojisLists}}
                    playAgainBtn={this.playAgain}
                  />
                </div>
              ) : (
                <div>
                  <NavBar
                    scoreDetails={{score, topScore, check}}
                    checks={check}
                  />
                  <ul className="emoji-List-Items">
                    {emojisLists.emojisList.map(each => (
                      <EmojiCard
                        emojiListItem={each}
                        key={each.id}
                        emojiClick={this.emojiClick}
                      />
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      )
    }

    return (
      <div className="app-container">
        <div className="bg-container">
          {/* (
            <div>
              <NavBar scoreDetails={{score, topScore}} />
              <WinOrLoseCard
                scoreBoard={{score, topScore, emojisLists}}
                playAgainBtn={this.playAgain}
              />
              )
            </div>
            ) */}
          {!Lst !== emojisLists ? (
            <div>
              <NavBar scoreDetails={{score, topScore, check}} />
              <WinOrLoseCard
                scoreBoard={{score, topScore, emojisLists}}
                playAgainBtn={this.playAgain}
              />
            </div>
          ) : (
            <div>
              <NavBar scoreDetails={{score, topScore}} checks={check} />
              <ul className="emoji-List-Items">
                {emojisLists.emojisList.map(each => (
                  <EmojiCard
                    emojiListItem={each}
                    key={each.id}
                    emojiClick={this.emojiClick}
                  />
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default EmojiGame
