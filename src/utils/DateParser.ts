import dayjs from 'dayjs';
import 'dayjs/locale/pt';

import utcPlugin from 'dayjs/plugin/utc';
import timezonePlugin from 'dayjs/plugin/timezone';
import customParseFormatPlugin from 'dayjs/plugin/customParseFormat';

dayjs.extend(utcPlugin);
dayjs.extend(timezonePlugin);
dayjs.extend(customParseFormatPlugin);

const formats: string[] = [
	'DD-MM-YYYY', 'DD/MM/YYYY', 'DD.MM.YYYY',
	'DD-MM-YYYY HH:mm', 'DD/MM/YYYY HH:mm', 'DD.MM.YYYY HH:mm',
	'HH:mm',
];

export default class dateParser extends null {
	parse(rawDate: Date | string): number {
		const SaoPauloDate = new Date(new Date().toLocaleString('en-US', { timeZone: 'America/Sao_Paulo' }));

		const now = dayjs(SaoPauloDate);
		let date = dayjs(rawDate, formats, 'pt', true);

		if (date.year() < SaoPauloDate.getFullYear()) date = date.year(SaoPauloDate.getFullYear());
		if (date.year() === SaoPauloDate.getFullYear()) {
			if (date.month() < SaoPauloDate.getMonth()) date = date.month(SaoPauloDate.getMonth());
			if (date.date() < SaoPauloDate.getDate()) date = date.date(SaoPauloDate.getDate());
		}

		if (date.isBefore(now)) throw new Error('Date cannot be in the past');

		return date.valueOf();
	}
}
