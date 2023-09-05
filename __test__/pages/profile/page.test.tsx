import react from 'react'
import {render ,screen} from "@testing-library/react"
import '@testing-library/jest-dom'
import UserProfile from '@/app/profile/[id]/page'

describe('profile page',()=>{


    it('should render properly',()=>{
        render(
        <UserProfile />
        )

        const heading = screen.getByRole('heading');
        expect(heading).toHaveTextContent("user profile")
    })  
})