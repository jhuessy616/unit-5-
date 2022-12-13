// TODO: Ability to CRUD todo's and save them somewhere
const router = require("express").Router()
const db = require("../assets/db.json")
const fs = require("fs")
const dbPath = "./assets/db.json"
// same thing not using a different file
// const db = [
//     {"todo_id": 1, "item": "Clean my office"},
//     {"todo_id": 2, "item": "Get groceries"}
// ]

// TODO: GET all todo's

router.get("/", (req, res) => {
    try {
        res.status(200).json({
            db
        })
    } catch (err) {
        res.status(500).json({
            status: `Error: ${err}`
        })
    }
})

// TODO: GET one todo


router.get("/:id", (req, res) => {
    
    // console.log(req.params.id)
    // console.log(db)
    try {
        let { id } = req.params
        let result = db.filter(i => i.todo_id == id)
        // !explanation of that line 
        // let result = []
        // for (item of db) {
        //     if (item.todo_id == id) {
        //         result.push(item)
        //     }
        // }
        
        res.status(200).json({
            status: `Found item at id: ${id}`,
            result
        })
    } catch (err) {
          res.status(500).json({
            error: `${err}`
        })
    }
})
router.get("/two", (req, res) => {
    res.send("We're hitting route 2")
})

// TODO: POST a todo


router.post("/", (req, res) => {
    try {
        const todoItem = req.body
        console.log(todoItem)
        fs.readFile(dbPath, (err, data) => {
            if (err) throw err
            const db = JSON.parse(data)
            db.push(todoItem)
            fs.writeFile(dbPath, JSON.stringify(db), () => null)
        })
          res.status(201).json({
            status: "New item created",
            todoItem
          })
        
    } catch (err) {
        console.log(err)
    }
})

// TODO: Update a todo

// TODO: Delete a todo

module.exports = router
