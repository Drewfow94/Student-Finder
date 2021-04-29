import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faMinus } from '@fortawesome/free-solid-svg-icons';
import OnEvent from "react-onevent";
import axios from 'axios';
import { BigHead } from '@bigheads/core';
import { Collapse, Button, Input} from 'reactstrap';

function FetchStudent() {
    const [students, setStudents] = useState([]);
    const [search, setSearch] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [icon, setIcon] = useState(faPlus);
    const [tags, addTags] = useState([]);
    const [tagValue, updateTagValue] = useState('');

    const toggle = () => {
        setIsOpen(!isOpen);
        setIcon(faMinus);
    };

    const updateTag = value => {
        if (value === " ") { return };
        updateTagValue(value);
        console.log(tags);
    };

    const addTag = tag => {
       if(!tags) { addTags(tag); }
       console.log(tags);
    }

    const testNumber = [1,2,3,4,5,6,7,8];

    useEffect(() => {
        axios.get('https://api.hatchways.io/assessment/students')
            .then(res => {
                setStudents(res.data);
                console.log(students.students);
            })
            .catch(err => {
                console.log(err)
            })
    }, []);

    return (
        <div>
            <ul>
                <div>
                    <input id="search" 
                        name="search"
                        type="text"
                        placeholder="Search by name"
                        value={search}
                        onChange={event => setSearch(event.target.value)}    
                    />
                </div>
                {students.students && students.students.
                    filter( student => {
                        return student.firstName.toLowerCase().includes( search.toLowerCase()) || student.lastName.toLowerCase().includes( search.toLowerCase());   
                    })
                    .map(student => (
                        <li key={student.id}>
                            <div className="studentInfoContainer">
                                <div className="studentAvatar"><BigHead/></div>
                                <div className="studentInfo">
                                <div className="studentName">{student.firstName + " " + student.lastName}
                                    <Button color="transparent" onClick={toggle} className="gradesButton">
                                        <FontAwesomeIcon onClick={() => {setIcon(faMinus)}} icon={icon}/>
                                    </Button>
                                </div>  
                                    <p>Email: {student.email}</p>
                                    <p>Company: {student.company}</p>
                                    <p>Skill: {student.skill}</p>
                                    <p>Average: {student.grades.reduce((sum, curr) => sum + Number(curr), 0) / student.grades.length}</p>
                                    <OnEvent enter={e => addTag(e.target.value)}>
                                        <Input onChange={e => updateTag(e.target.value)} type="text" name="tag" placeholder="Add a tag"/>
                                    </OnEvent>
                                <Collapse isOpen={isOpen}>
                                    <span>{"Test: " + testNumber[0]}<p className="studentGrade">{student.grades[0] + "%"}</p></span>
                                    <span>{"Test: " + testNumber[1]}<p className="studentGrade">{student.grades[1] + "%"}</p></span>
                                    <span>{"Test: " + testNumber[2]}<p className="studentGrade">{student.grades[2] + "%"}</p></span>
                                    <span>{"Test: " + testNumber[3]}<p className="studentGrade">{student.grades[4] + "%"}</p></span>
                                    <span>{"Test: " + testNumber[4]}<p className="studentGrade">{student.grades[4] + "%"}</p></span>
                                    <span>{"Test: " + testNumber[5]}<p className="studentGrade">{student.grades[5] + "%"}</p></span>
                                    <span>{"Test: " + testNumber[6]}<p className="studentGrade">{student.grades[6] + "%"}</p></span>
                                    <span>{"Test: " + testNumber[7]}<p className="studentGrade">{student.grades[7] + "%"}</p></span>
                                </Collapse>
                                <ul>
                                    {tags && tags.map(tagValue => <li className="tags">{tagValue}</li>)}
                                </ul>
                                </div> 
                            </div>
                        </li>    
                ))}
            </ul>
        </div>
    )
}

export default FetchStudent;