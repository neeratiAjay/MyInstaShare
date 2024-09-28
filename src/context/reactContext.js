import React from 'react'

const ReactContext = React.createContext({
  userInput: '',
  showSearhContent: false,
  showMenuBar: false,
  activeOptionId: 'home',
  showMenu: () => {},
  closeMenu: () => {},
  changeOptionToHome: () => {},
  changeOptionToProfile: () => {},
  changeOptionToSearch: () => {},
  changeSearchContainer: () => {},
})
export default ReactContext
