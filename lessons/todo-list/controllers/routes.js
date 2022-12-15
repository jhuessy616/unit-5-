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
// TODO: pass id value as a param; pass updated todo thru the body; read the file; run thru each iterable; check if post_id matches param id; reassign the db at the index to what comes from body; save the file
router.put("/:id", (req, res) => {
    try {
        const id = Number(req.params.id)
    
        const todo = req.body
        console.log(todo)
    
        let result
        fs.readFile(dbPath, (err, data) => {
            if (err) throw err
            const db = JSON.parse(data)
            
            db.forEach((element, index) => {
                if (element.todo_id === id) {
                    db[index] = todo
                    result = todo
                    fs.writeFile(dbPath, JSON.stringify(db), err => console.log(err))
                    }
                })
    
            result ? res.status(200).json({
                status: `ID: ${id} succesfully modified`,
                object: result
                })
                : res.status(404).json({
                    status: `ID: ${id} not found`
                })
            })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            status: `Error: ${err}`
        })
    }
})

// TODO: Delete a todo

// TODO: pass the id as a param; read the file; filter to match the post_id to the id from the param but don't return what matches!; return what doesn't match; write to file

router.delete("/:id", (req, res) => {
    
    try {
        const id = Number(req.params.id)
        fs.readFile(dbPath, (err, data) => {
            if (err) throw err
            const db = JSON.parse(data)
            const filteredDb = db.filter(element => {
                if (element.todo_id !== id) {
                    return element
                }
            })
            
            fs.writeFile(dbPath, JSON.stringify(filteredDb), (err) => console.log(err))
            
            res.status(200).json({
                status: `ID: ${id} successfully deleted`,
                filteredDb
            })
        })
        
    } catch (err) {
        console.log(err)
        res.status(500).json({
            status: `Error: ${err}`
        })
    }
})


module.exports = router
