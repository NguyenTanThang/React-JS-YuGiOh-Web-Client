import React, { useState } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';
import AddCard from "../components/Cards/AddCard";
import AddLinkCard from "../components/Cards/AddLinkCard";
import AddPendulumCard from "../components/Cards/AddPendulumCard";
import Header from "../components/Partials/Header";

const AddMonsterCardPage = (props) => {
  const [activeTab, setActiveTab] = useState('1');

  const toggle = tab => {
    if(activeTab !== tab) setActiveTab(tab);
  }

  return (
    <div>
        <Header imageURL={"https://wallpaperaccess.com/full/1300535.jpg"} headerText={"CREATE MONSTER CARD"}/>

        <div className="container section-padding">
            <div className="deck-tabs">
                <Nav tabs>
                    <NavItem>
                    <NavLink
                        className={classnames({ active: activeTab === '1' })}
                        onClick={() => { toggle('1'); }}
                    >
                        Normal
                    </NavLink>
                    </NavItem>
                    <NavItem>
                    <NavLink
                        className={classnames({ active: activeTab === '2' })}
                        onClick={() => { toggle('2'); }}
                    >
                        Link
                    </NavLink>
                    </NavItem>
                    <NavItem>
                    <NavLink
                        className={classnames({ active: activeTab === '3' })}
                        onClick={() => { toggle('3'); }}
                    >
                        Pendulum
                    </NavLink>
                    </NavItem>
                </Nav>
                <TabContent activeTab={activeTab}>
                    <TabPane tabId="1">
                        <AddCard/>
                    </TabPane>
                    <TabPane tabId="2">
                        <AddLinkCard/>
                    </TabPane>
                    <TabPane tabId="3">
                        <AddPendulumCard/>
                    </TabPane>
                </TabContent>
            </div>
        </div>
    </div>
  );
}

export default AddMonsterCardPage;