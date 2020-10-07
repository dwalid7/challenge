import React, { useState, useEffect } from 'react';
import './App.css';
import APIHelper from "./APIHelper.js"

function App(props) {
  const [newMember, setNewMember] = useState('')
  const [member, setMember] = useState([])

  useEffect(() => {
    const fetchMemberAndSetCrew = async () => {
      const crew = await APIHelper.getAllCrew()
      setMember(crew)
    }
    fetchMemberAndSetCrew()
  }, [])

  const inputValue = (e) => {
    e.preventDefault();
    setNewMember(e.target.value)
  }
  /*
  const handleMemberClick = () => {
    setMember([...member, newMember]);
    setNewMember('');
  }
  */
  const createMember = async e => {
    e.preventDefault()
    if (!newMember) {
      alert("please enter something")
      return
    }
    if (member.some(({ task }) => task === newMember)) {
      alert(`Task: ${newMember} already exists`)
      return
    }
    const newM = await APIHelper.createMember(newMember)
    setMember([...member, newM])
  }

  const splitEvery = (array, length) =>
    array.reduce(
      (result, item, index) => {
        if (index % length === 0) result.push([])
        result[Math.floor(index / length)].push(item)
        return result
      },
      []
    )

  console.log('nouveau membre :', newMember)
  console.log('listes membres :', member)
  return (
    <div className="App">

      <header className="App-header">
        <h2>
          <img src="https://www.wildcodeschool.com/assets/logo_main-e4f3f744c8e717f1b7df3858dce55a86c63d4766d5d9a7f454250145f097c2fe.png" className="App-logo" alt="Wild Code School logo" />
          Les Argonautes
        </h2>
      </header>


      <main className="App-main">

        <h2>Ajouter un(e) Argonaute</h2>

        <form className="new-member-form">
          <label htmlFor="name">Nom de l&apos;Argonaute</label>
          <div className="new-member-form2">
            <input id="name" name="name" type="text" placeholder="Charalampos" className="input-form" value={newMember} onChange={inputValue} />
            <button type="button" onClick={createMember} disabled={!newMember}>Envoyer</button>
          </div>
        </form>

        {/*<!-- Members list ->*/}
        <h2>Membres de l'équipage</h2>
        <section >
          {/*<div className="member-item">
            {member.map(member => <div><p>{member.crew}</p></div>)}
  </div>*/}
          <div className="member-lists">
            {splitEvery(member, 3).map((memberChunk, index) => (
              <div key={index} className="member-list">
                {memberChunk.map((memberr, i) => (
                  <div key={i} className="member-item">
                    {member.map(member => <div><p>{member.crew}</p></div>)}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}

export default App;

