import React, { useState } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';
import SubCardList from "../Cards/SubCardList";
import SubSpellCardList from "../SpellCards/SubSpellCardList";
import SubTrapCardList from "../TrapCards/SubTrapCardList";

const DeckTabs = (props) => {
  const [activeTab, setActiveTab] = useState('1');

  const toggle = tab => {
    if(activeTab !== tab) setActiveTab(tab);
  }

  const deckID = props.deckID;

  return (
    <div className="container deck-tabs">
      <Nav tabs>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '1' })}
            onClick={() => { toggle('1'); }}
          >
            Monster Cards
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '2' })}
            onClick={() => { toggle('2'); }}
          >
            Spell Cards
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '3' })}
            onClick={() => { toggle('3'); }}
          >
            Trap Cards
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
            <SubCardList deckID={deckID} cards={props.monsterCards} />
        </TabPane>
        <TabPane tabId="2">
            <SubSpellCardList deckID={deckID} cards={props.spellCards} />
        </TabPane>
        <TabPane tabId="3">
            <SubTrapCardList deckID={deckID} cards={props.trapCards} />
        </TabPane>
      </TabContent>
    </div>
  );
}

export default DeckTabs;