var chai = require('chai');
var should = chai.should();

describe('Meeting tests', function(){
    var Meeting = require('../util/meeting.js');

    describe('New instance of meeting', function(){
        var owner = 'Joe';
        var room = {
            number: 121,
            capacity: 10
        };
        var date = new Date(2018, 0, 31, 11, 0, 0, 0);
        var duration = 1;
        var meeting = new Meeting(owner, room, date, duration);
        console.log(meeting.toString());
        it('should be initialized with owner', function(){
            should.equal(meeting.getOwner(), owner);
        })
        it('should be initialized with room', function(){
            should.equal(meeting.getRoom(), room);
        })
        it('should be initialized with Date', function(){
            should.equal(meeting.getDate(), date);
        })
        it('should be initialized with duration', function(){
            should.equal(meeting.getDuration(), duration);
        })
        it('should be initialized with 0 attendees', function(){
            should.equal(meeting.numAttendees(), 0);
        });
    });

    describe('Adding attendees to meeting', function(){
        var owner = 'Bob';
        var room = {
            number: 55,
            capacity: 4
        };
        var date = new Date(2018, 0, 31, 11, 0, 0, 0);
        var duration = 2;
        var meeting = new Meeting(owner, room, date, duration);
        var attendees = [ "Abe","Bob","Cal","Dav","Eva" ];
        console.log(meeting.toString());
        it('should be initialized with 0 attendees', function(){
            should.equal(meeting.numAttendees(), 0);
        });
        it('should be set with number of attendees', function(){
            meeting.setAttendees(attendees);
            should.equal(meeting.numAttendees(), attendees.length);
        });
    });

})