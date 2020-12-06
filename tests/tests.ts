import * as tims from '../mod.ts';
import {
	assertEquals,
	assert
} from 'https://deno.land/std/testing/asserts.ts';

const now = new Date()

Deno.test('Is hour a duration', () => {
	assert(tims.isDuration('hour'))
})

Deno.test('Between one day', () => {
	const inOneDay = new Date()
	inOneDay.setDate(now.getDate() + 1)
	assertEquals(tims.between(now, inOneDay, {
		locale: 'en'
	}), 'one day');
})

Deno.test('Between two day and five hours', () => {
	const inTwoDaysAndFiveHours = new Date()
	inTwoDaysAndFiveHours.setDate(now.getDate() + 2)
	inTwoDaysAndFiveHours.setHours(inTwoDaysAndFiveHours.getHours() + 5)
	assertEquals(tims.between(now, inTwoDaysAndFiveHours, {
		locale: 'en'
	}), '2 days and 5 hours');
})

Deno.test('Since three days', () => {
	const sinceThreeDays = new Date();
	sinceThreeDays.setDate(now.getDate() - 3);
	assertEquals(tims.since(sinceThreeDays, {
		locale: 'en'
	}), '3 days');
})

Deno.test('Since four years', () => {
	const sinceThreeDays = new Date();
	sinceThreeDays.setFullYear(now.getFullYear() - 4);
	assertEquals(tims.since(sinceThreeDays, {
		locale: 'en'
	}), '4 years');
})
