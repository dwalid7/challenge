import axios from "axios"

const API_URL = "http://localhost:3000/crew/"

async function createMember(crew) {
    const { data: newMember } = await axios.post(API_URL, {
        crew
    })
    return newMember
}

async function deleteMember(id) {
    const message = await axios.delete(`${API_URL}${id}`)
    return message
}

async function updateMember(id, payload) {
    const { data: newMember } = await axios.put(`${API_URL}${id}`, payload)
    return newMember
}

async function getAllCrew() {
    const { data: crew } = await axios.get(API_URL)
    return crew
}

export default { createMember, deleteMember, updateMember, getAllCrew }