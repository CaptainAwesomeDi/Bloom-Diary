import React from "react"
import PropTypes from "prop-types"
import { Button, Icon } from "react-materialize"
import Journal from "../Journal"
import chunk from 'lodash/chunk'
import { list } from "postcss";

class CalendarGrid extends React.Component {


  constructor(props) {
    super(props);
    let date = new Date();
    let yyyy = date.getFullYear();
    let mm = date.getMonth() + 1;
    let dd = date.getDate();

    this.state = {
      year: yyyy,
      month: mm,
      day: dd,
      today: mm + "/" + dd + "/" + yyyy,
      listOfJournal: []
    }
  }

  //Moving get server response to a separate function it can be easily in other functions
  getData = () => {
    $.get(`/users/${this.props.currentUserId}/journals`, (data) => {
      if (data) {
        let currentMonthJournals = data.filter((journal) => {

          const [year, month, day] = journal.date.split('-').map(Number);
          return (this.state.year === year && this.state.month === month);

        });
        this.setState({ listOfJournal: currentMonthJournals });
      }
    });
  }

  componentDidMount() {
    this.getData();
  }

  changeYear = (direction) => {
    this.setState({
      year: this.state.year + direction
    });
    this.getData();
  }

  changeMonth = (direction) => {
    if (this.state.month + direction > 12) {
      this.setState({
        month: 1,
        year: this.state.year + 1
      });

    } else if(this.state.month + direction < 1){

      this.setState({
        month: 12,
        year: this.state.year - 1
      });
    } else {
      this.setState({
        month: this.state.month + direction
      });
    }
    this.getData();
  }

  daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
  }

  drawWeek = (className, weekNumber) => {
    let daysArray = [1, 2, 3, 4, 5, 6, 7];
    return daysArray.map((day) => {
      let dateNumber = (weekNumber - 1) * 7 + day;
      let viableJournalDatas = this.state.listOfJournal.filter(journal => {
        let result = Number(journal.date.split('-')[2]) === dateNumber && Number(journal.date.split('-')[1]) === this.state.month
        return result
      });
      let journalContent = (viableJournalDatas[0] || { content: '' }).content;

      return <li key={day}
        className={className}
        data-id={day}
        data-datenumber={dateNumber}>

        {(className === "day") ? 
          <Journal 
            year={this.state.year}
            month={this.state.month}
            day={dateNumber}
            content={journalContent}

          /> :
          ""
        }
      </li>
    });
  }

  drawMonth = () => {
    let days = this.daysInMonth(this.state.month, this.state.year);
    let weeks = Math.floor(days / 7);
    let weeksArray = [];
    for (let weekNumber = 1; weekNumber < weeks + 1; weekNumber++) {
      weeksArray.push(weekNumber);
    }
    return weeksArray.map((week) => {
      return <ul key={week} className="week" data-id={week}>{this.drawWeek('day', week)}</ul>
    });
  }

  drawCalendarCanvas = () => {
    let days = this.daysInMonth(this.state.month, this.state.year);
    let weeks = Math.ceil(days / 7);
    let weeksArray = [];
    for (let weekNumber = 1; weekNumber < weeks + 1; weekNumber++) {
      weeksArray.push(weekNumber);
    }
    return weeksArray.map((week) => {
      return <ul key={week} className="canvasWeek" data-id={week}>{this.drawWeek('canvasDay', week)}</ul>
    });
  }

  drawReminder = () => {
    let days = this.daysInMonth(this.state.month, this.state.year);
    let reminderDays = days % 7;
    let reminderDaysArray = [];
    for (let reminderCount = 1; reminderCount < reminderDays + 1; reminderCount++) {
      reminderDaysArray.push(reminderCount);
    }
    return reminderDaysArray.map((day) => {

      let dateNumber = 28 + day;
      let viableJournalDatas = this.state.listOfJournal
        .filter(journal => Number(journal.date.split('-')[2]) === dateNumber);
      let journalContent = (viableJournalDatas[0] || { content: '' }).content;

      return <li key={day} className="day" data-id={day} data-number={28 + day}>
        <Journal
          dateObject={{
            year: this.state.year,
            month: this.state.month,
            day: 28 + day
          }}
          journalData={viableJournalDatas[0]}
          journalContent={journalContent}
        />
      </li>
    });
  }


  renderCalendar() {
    const daysInMonth = this.daysInMonth(this.state.month, this.state.year);
    const allDays = [];
    const { year, month, listOfJournal } = this.state;

    for(var day = 1; day < daysInMonth + 1; day++) {
      const entry = listOfJournal.find(x => {
        const [ , ,postDay ] = x.date.split('-').map(Number);
        return postDay === day;
      }) || "";
      allDays.push({ year, month, day, content: entry.content, data: entry });
    }

    const daysByWeek = chunk(allDays, 7);

    return daysByWeek.map((week, idx) =>
      <ul className="week" key={idx}>
        {week.map(day => (
          <li className="day" key={day.day}>
            <Journal {...day} />
          </li>
        ))}
      </ul>
    );
  }

  render () {
    return (
      <React.Fragment>        
        <div className="calendarSelection">
          {/* Shows Year */}
          <div style={{display:"block"}}>
            <a className="waves-effect waves btn-flat" onClick={()=>this.changeYear(-1)}>◀︎</a>
            <div className="show-year">
              {this.state.year}
            </div>
            <a className="waves-effect waves btn-flat" onClick={()=>this.changeYear(+1)}>▶︎</a>
          </div>
        <div>
          {/* Shows Month */}
          <a className="waves-effect waves btn-flat" onClick={()=>this.changeMonth(-1)}>◀︎</a>
          <div className="show-month">
            {this.state.month}
          </div>
          <a className="waves-effect waves btn-flat" onClick={() => this.changeMonth(+1)}>▶︎</a>
        </div>

        </div>
        <div className="grid_container">
          <div className="calendar_month">
            {/* {this.drawMonth()}
            <ul className="week" data-id={5}>{this.drawReminder()}</ul> */}
            {this.renderCalendar()}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default CalendarGrid
