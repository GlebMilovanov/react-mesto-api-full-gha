import { Route, Routes, Navigate, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Header } from './Header'
import { Main } from './Main'
import { Footer } from './Footer'
import { EditProfilePopup } from './EditProfilePopup'
import { AddPlacePopup } from './AddPlacePopup'
import { EditAvatarPopup } from './EditAvatarPopup'
import { ConfirmationPopup } from './ConfirmationPopup'
import { ImagePopup } from './ImagePopup'
import { api } from '../utils/api'
import { CurrentUserContext } from '../contexts/CurrentUserContext'
import { Login } from './Login'
import { Register } from './Register'
import { ProtectedRoute } from './ProtectedRoute'
import { login, registration, checkToken } from '../utils/auth'
import { InfoTooltip } from './InfoTooltip'

function App() {
  /* navigation */
  const navigate = useNavigate()
  const paths = {
    login: '/sign-in',
    register: '/sign-up',
    main: '/',
  }

  /* STATES */
  /* popup states */
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false)
  const [isRegistrationError, setIsRegistrationError] = useState(false)

  /* user states */
  const [loggedIn, setLoggedIn] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)

  /* card states */
  const [cards, setCards] = useState([])
  const [selectedCard, setSelectedCard] = useState(null)
  const [cardToDelete, setCardToDelete] = useState(null)

  /* loading state */
  const [isLoading, setIsLoading] = useState(false)

  /* EFFECT */
  /* preload cards and user info */
  useEffect(() => {
    const fetchData = async () => {
      if (loggedIn) {
        try {
          const [userInfoRes, cardsInfoRes] = await Promise.all([api.getUserInfo(), api.getCardsInfo()])
          setCurrentUser((currentState) => ({
            ...currentState,
            ...userInfoRes.data,
            id: userInfoRes.data._id,
          }))

          setCards(cardsInfoRes.reverse())
        } catch (err) {
          console.error(err)
        }
      }
    }

    fetchData()
  }, [loggedIn])

  /* check user token and add email to user info */
  useEffect(() => {
    const checkUserToken = async () => {
      try {
        const response = await checkToken()
        if (response) {
          setLoggedIn(true)
          navigate(paths.main, { replace: true })
          setCurrentUser((currentState) => ({
            ...currentState,
            email: response.data.email,
          }))
        } else {
          setLoggedIn(false)
          navigate(paths.login, { replace: true })
        }
      } catch (err) {
        setLoggedIn(false)
        console.error(err)
      }
    }
    checkUserToken()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /* FUNCTIONS */
  /* popup functions */
  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true)
  }

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true)
  }

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true)
  }

  const handleCardClick = (card) => {
    setSelectedCard(card)
  }

  const handleDeleteClick = (card) => {
    setCardToDelete(card)
  }

  const handleInfoTooltip = () => {
    setIsInfoTooltipOpen(true)
  }

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setSelectedCard(null)
    setCardToDelete(null)
    setIsInfoTooltipOpen(false)
  }

  /* user functions */
  const handleUpdateUser = async ({ name, about }) => {
    setIsLoading(true)
    try {
      const updatedUser = await api.sendUserInfo({ name, about })
      setCurrentUser((currentState) => ({
        ...currentState,
        ...updatedUser.data,
      }))
      closeAllPopups()
    } catch (err) {
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleUpdateAvatar = async ({ avatar }) => {
    setIsLoading(true)
    try {
      const updatedUser = await api.updateUserAvatar({ avatar })
      setCurrentUser((currentState) => ({
        ...currentState,
        avatar: updatedUser.data.avatar,
      }))
      closeAllPopups()
    } catch (err) {
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  /* card functions */
  const handleCardLike = async (card) => {
    const isLiked = card.likes.some((i) => i === currentUser._id)
    try {
      const newCard = await api.changeLikeCardStatus(card._id, !isLiked)
      setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)))
    } catch (err) {
      console.error(err)
    }
  }

  const handleCardDelete = async (card) => {
    setIsLoading(true)
    try {
      await api.deleteCard(card._id)
      setCards((state) => state.filter((c) => c._id !== card._id))
    } catch (err) {
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddPlaceSubmit = async ({ name, link }) => {
    setIsLoading(true)
    try {
      const newCard = await api.createCard({ name, link })
      setCards([newCard, ...cards])
      closeAllPopups()
    } catch (err) {
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  /* registration/login/sign-out functions */

  const handleRegister = async (email, password) => {
    setIsLoading(true)
    try {
      await registration(email, password)
      navigate(paths.login, { replace: true })
      setIsRegistrationError(false)
      handleInfoTooltip()
    } catch (err) {
      console.error(err)
      setIsRegistrationError(true)
      handleInfoTooltip()
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogin = async (email, password) => {
    setIsLoading(true)
    try {
      const data = await login(email, password)
      setLoggedIn(true)
      navigate(paths.main, { replace: true })
    } catch (err) {
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignOut = () => {
    setLoggedIn(false)
    setCurrentUser(null)
    setCards([])
  }

  return (
    <div className='page'>
      <CurrentUserContext.Provider value={currentUser}>
        <Header paths={paths} onHandleSignOut={handleSignOut} />
        <Routes>
          <Route path={paths.login} element={<Login onLogin={handleLogin} isLoading={isLoading} />} />
          <Route path={paths.register} element={<Register onRegister={handleRegister} isLoading={isLoading} />} />
          <Route
            path={paths.main}
            element={
              <ProtectedRoute redirectPath={paths.login} loggedIn={loggedIn}>
                <Main
                  onEditAvatar={handleEditAvatarClick}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  cards={cards}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  onCardDelete={handleDeleteClick}
                />
                <Footer />
              </ProtectedRoute>
            }
          />
          <Route path='*' element={loggedIn ? <Navigate to={paths.main} replace /> : <Navigate to={paths.login} replace />} />
        </Routes>
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} isLoading={isLoading} />
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} isLoading={isLoading} />
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} isLoading={isLoading} />
        <ConfirmationPopup card={cardToDelete} onClose={closeAllPopups} onConfirm={handleCardDelete} isLoading={isLoading} />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <InfoTooltip isOpen={isInfoTooltipOpen} onClose={closeAllPopups} isError={isRegistrationError} />
      </CurrentUserContext.Provider>
    </div>
  )
}

export default App
