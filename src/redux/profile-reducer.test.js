import profileReducer, {addPostActionCreator, deletePost} from "./profile-reducer";
    //1. test data
let state = {
    posts : [
        {id: 1, message: 'hi', like: 12},
        {id: 2, message: 'My baby', like: 19},
        {id: 3, message: 'Alona', like: 12}
    ]
}

it('length of posts should be incremented', () =>{
    //2. action
    let action = addPostActionCreator('la-la')
    let newState = profileReducer(state, action)
    //3. expectation

    expect(newState.posts.length).toBe(4);
})

it('message of new post should be corrected', () =>{

    let action = addPostActionCreator('la-la')
    //2. action
    let newState = profileReducer(state, action)
    //3. expectation

    expect(newState.posts[3].message).toBe('la-la');
})

it('after deleting length of massages should be decremented', () =>{

    let action = deletePost(1)
    //2. action
    let newState = profileReducer(state, action)
    //3. expectation

    expect(newState.posts.length).toBe(2);
})
