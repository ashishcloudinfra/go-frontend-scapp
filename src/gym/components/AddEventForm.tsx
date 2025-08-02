import { useState } from "react";
import { EventFormValues, EventMetadata } from "../../types/Event";
import { EventRoom } from "../../types/EventRoom";
import DaySelector from "./DaySelector";
import { DayKey, MonthKey } from "../../helpers";
import DateOrDaySelector, { onChangeParam } from "./DateOrDaySelector";
import MonthSelector from "./MonthSelector";

interface IAddEventRoomFormFormProps {
  eventRooms: EventRoom[];
  formValues?: EventFormValues;
  onFormSubmit: (formValues: EventFormValues) => void;
}

export default function AddEventForm(props: IAddEventRoomFormFormProps) {
  const [formValues, setFormValues] = useState<EventFormValues>(props.formValues || {
    name: '',
    description: '',
    organiserId: '',
    eventRoomId: '',
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',
    isAllDayEvent: false,
    isRecurring: false,
    recurrenceType: '',
    status: 'review',
    metadata: {
      daily: {
        repeatEvery: 1
      },
      weekly: {
        repeatEvery: 1,
        repeatOn: []
      },
      monthly: {
        repeatEvery: 1,
        monthDate: 1,
        monthWeekNumber: 'first',
        selectedWeekDay: 'Monday',
        selectorType: 'day'
      },
      yearly: {
        every: 'January',
        monthDate: 1,
        monthWeekNumber: 'first',
        selectedWeekDay: 'Monday',
        selectorType: 'day'
      }
    }
  });
  const [errors, setErrors] = useState<Partial<Record<string, string>>>({});
  const [isVirtualEvent, setIsVirtualEvent] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState<MonthKey>('January');

  const toggleDay = (day: DayKey) => {
    if ((formValues.metadata['weekly'].repeatOn || []).includes(day)) {
      setFormValues({
        ...formValues,
        metadata: {
          ...formValues.metadata,
          [formValues.recurrenceType]: {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            ...formValues.metadata[formValues.recurrenceType as keyof EventFormValues],
            repeatOn: (formValues.metadata['weekly'].repeatOn || []).filter((d) => d !== day),
          }
        }
      })
    } else {
      setFormValues({
        ...formValues,
        metadata: {
          ...formValues.metadata,
          [formValues.recurrenceType]: {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            ...formValues.metadata[formValues.recurrenceType as keyof EventFormValues],
            repeatOn: [...(formValues.metadata['weekly'].repeatOn || []), day],
          }
        }
      })
    }
  };

  const validateForm = (): boolean => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const newErrors: any = {};

    if (!formValues.name) newErrors.name = "Plan name is required.";
    if (!formValues.startDate) newErrors.startDate = "Start date is required.";
    if (!formValues.endDate) newErrors.endDate = "End date is required.";
    if (!formValues.isAllDayEvent && !formValues.startTime) newErrors.startTime = "Start time is required.";
    if (!formValues.isAllDayEvent && !formValues.endTime) newErrors.endTime = "End time is required.";
    if (!isVirtualEvent && !formValues.eventRoomId) newErrors.eventRoomId = "Event room is required.";
    if (formValues.isRecurring && !formValues.recurrenceType) newErrors.recurrenceType = 'Recurrence type is required';
    if (formValues.recurrenceType === 'weekly' && !(formValues.metadata['weekly'].repeatOn || []).length) newErrors.selectedDays = 'Please select days';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (e.target.type === "checkbox") {
      setFormValues({ ...formValues, [name]: e.target.checked });
    } else {
      setFormValues({ ...formValues, [name]: value });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      props.onFormSubmit(formValues);
    }
  };

  const onRepeatEveryChange = (val: number) => {
    setFormValues({
      ...formValues,
      metadata: {
        ...formValues.metadata,
        [formValues.recurrenceType]: {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          ...formValues.metadata[formValues.recurrenceType as keyof EventFormValues],
          repeatEvery: val,
        }
      }
    })
  }

  const onRecurrenceDateOrDayChange = (val: onChangeParam) => {
    setFormValues({
      ...formValues,
      metadata: {
        ...formValues.metadata,
        [formValues.recurrenceType]: {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          ...formValues.metadata[formValues.recurrenceType as keyof EventFormValues],
          monthDate: +val.monthDate,
          monthWeekNumber: val.monthWeekNumber,
          selectedWeekDay: val.selectedWeekDay,
          selectorType: val.selectorType
        }
      }
    })
  }

  return (
    <div className="md:p-8 max-w-4xl">
      <div className="mb-4 grid grid-col-1 md:grid-cols-2 gap-8" key={'Event name'}>
        <div className="">
          <label htmlFor={'plan-name'} className="block mb-2 text-md font-medium text-gray-900">
            Event title <span className="text-red-500">*</span>
          </label>
          <input
            type={'text'}
            name={'name'}
            id={'name'}
            value={formValues.name}
            onChange={handleChange}
            className={`bg-gray-200 border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${
              errors['name' as keyof EventFormValues] ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors['name' as keyof EventFormValues] && (
            <p className="text-red-500 text-sm">
              {errors['name' as keyof EventFormValues]}
            </p>
          )}
        </div>

        <div className="">
          <label htmlFor={'description'} className="block mb-2 text-md font-medium text-gray-900">
            Event description
          </label>
          <input
            type={'description'}
            name={'description'}
            id={'description'}
            value={formValues.description}
            onChange={handleChange}
            className={`bg-gray-200 border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
          />
        </div>

        <div className={`place-content-center col-span-1 ${isVirtualEvent ? 'md:col-span-2' : 'md:col-span-1'}`}>
          <label className="inline-flex items-center cursor-pointer">
            <span className="block mr-6 text-md font-medium text-gray-900">Is this a virtual event ?</span>
            <input name="isVirtualEvent" type="checkbox" className="sr-only peer" checked={isVirtualEvent} onChange={() => setIsVirtualEvent(!isVirtualEvent)} />
            <div className="relative w-11 h-6 bg-gray-400 peer-focus:outline-hidden peer-focus:ring-4 peer-focus:ring-blue-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:rtl:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-secondary"></div>
          </label>
        </div>

        {!isVirtualEvent && <div className="">
          <label htmlFor={'eventRoomId'} className="block mb-2 text-md font-medium text-gray-900">
            Event room <span className="text-red-500">*</span>
          </label>
          <select
            name={'eventRoomId'}
            id={'eventRoomId'}
            value={formValues.eventRoomId}
            onChange={handleChange}
            className={`bg-gray-200 border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${
              errors['eventRoomId' as keyof EventFormValues] ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">Select Event room</option>
            {props.eventRooms.map((eventRoom) => (
              <option key={eventRoom.id} value={eventRoom.id}>
                {eventRoom.name}
              </option>
            ))}
          </select>
          {errors['eventRoomId' as keyof EventFormValues] && (
            <p className="text-red-500 text-sm">
              {errors['eventRoomId' as keyof EventFormValues]}
            </p>
          )}
        </div>}

        <div className="">
          <label htmlFor={'startDate'} className="block mb-2 text-md font-medium text-gray-900">
            Event start date <span className="text-red-500">*</span>
          </label>
          <input
            type='date'
            name={'startDate'}
            id={'startDate'}
            value={formValues.startDate}
            onChange={handleChange}
            className={`bg-gray-200 border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${
              errors['startDate' as keyof EventFormValues] ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors['startDate' as keyof EventFormValues] && (
            <p className="text-red-500 text-sm">
              {errors['startDate' as keyof EventFormValues]}
            </p>
          )}
        </div>

        <div className="">
          <label htmlFor={'endDate'} className="block mb-2 text-md font-medium text-gray-900">
            Event end date <span className="text-red-500">*</span>
          </label>
          <input
            type='date'
            name={'endDate'}
            id={'endDate'}
            value={formValues.endDate}
            onChange={handleChange}
            className={`bg-gray-200 border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${
              errors['endDate' as keyof EventFormValues] ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors['endDate' as keyof EventFormValues] && (
            <p className="text-red-500 text-sm">
              {errors['endDate' as keyof EventFormValues]}
            </p>
          )}
        </div>

        <div className="col-span-1 md:col-span-2">
          <label className="inline-flex items-center cursor-pointer">
            <span className="block mr-6 text-md font-medium text-gray-900">Is all day event ?</span>
            <input name="isAllDayEvent" type="checkbox" className="sr-only peer" checked={formValues.isAllDayEvent} onChange={handleChange} />
            <div className="relative w-11 h-6 bg-gray-400 peer-focus:outline-hidden peer-focus:ring-4 peer-focus:ring-blue-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:rtl:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-secondary"></div>
          </label>
        </div>

        {!formValues.isAllDayEvent && <>
          <div>
            <label htmlFor="startTime" className="block mb-2 text-md font-medium text-gray-900">
              Event start time
            </label>
            <input
              name="startTime"
              type="time"
              id="startTime"
              className={`bg-gray-200 border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${
                errors['startTime' as keyof EventFormValues] ? "border-red-500" : "border-gray-300"
              }`}
              value={formValues.startTime}
              onChange={handleChange}
            />
            {errors['startTime' as keyof EventFormValues] && (
              <p className="text-red-500 text-sm">
                {errors['startTime' as keyof EventFormValues]}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="endTime" className="block mb-2 text-md font-medium text-gray-900">
              Event end time
            </label>
            <input
              name="endTime"
              type="time"
              id="endTime"
              className={`bg-gray-200 border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${
                errors['endTime' as keyof EventFormValues] ? "border-red-500" : "border-gray-300"
              }`}
              value={formValues.endTime}
              onChange={handleChange}
            />
            {errors['endTime' as keyof EventFormValues] && (
              <p className="text-red-500 text-sm">
                {errors['endTime' as keyof EventFormValues]}
              </p>
            )}
          </div>
        </>}

        <div className="col-span-1 md:col-span-2">
          <label className="inline-flex items-center cursor-pointer">
            <span className="block mr-6 text-md font-medium text-gray-900">Is recurring event ?</span>
            <input name="isRecurring" type="checkbox" className="sr-only peer" checked={formValues.isRecurring} onChange={handleChange} />
            <div className="relative w-11 h-6 bg-gray-400 peer-focus:outline-hidden peer-focus:ring-4 peer-focus:ring-blue-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:rtl:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-secondary"></div>
          </label>
        </div>

        {formValues.isRecurring && <>
          <div className="col-span-1 md:col-span-2">
            <label htmlFor={'recurrenceType'} className="block mb-2 text-md font-medium text-gray-900">
              Select recurrence type <span className="text-red-500">*</span>
            </label>
            <select
              name={'recurrenceType'}
              id={'recurrenceType'}
              value={formValues.recurrenceType}
              onChange={handleChange}
              className={`bg-gray-200 border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${
                errors['recurrenceType' as keyof EventFormValues] ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Select recurrence type</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
            {errors['recurrenceType' as keyof EventFormValues] && (
              <p className="text-red-500 text-sm">
                {errors['recurrenceType' as keyof EventFormValues]}
              </p>
            )}
          </div>

          {formValues.recurrenceType && formValues.recurrenceType !== 'yearly' && <div className="col-span-1 md:col-span-2"><div className="flex justify-start gap-4 place-items-center">
            <label htmlFor={'repeatEvery'} className="block mb-2 text-md font-medium text-gray-900">
              Repeat every <span className="text-red-500">*</span>
            </label>
            <div>
              <select
                key={'repeatEvery'}
                name={'repeatEvery'}
                id={'repeatEvery'}
                value={formValues.metadata[formValues.recurrenceType as keyof EventMetadata].repeatEvery}
                onChange={(e) => onRepeatEveryChange(+e.target.value)}
                className={`bg-gray-200 border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${
                  errors['repeatEvery' as keyof EventFormValues] ? "border-red-500" : "border-gray-300"
                }`}
              >
                {Array(99).fill(99).map((_, idx) => <option key={idx} value={idx+1}>{idx+1}</option>)}
              </select>
              {errors['repeatEvery' as keyof EventFormValues] && (
                <p className="text-red-500 text-sm">
                  {errors['repeatEvery' as keyof EventFormValues]}
                </p>
              )}
            </div>
            <span>{formValues.recurrenceType}</span>
          </div></div>}

          {formValues.recurrenceType === 'yearly' && <div className="col-span-1 md:col-span-2">
            <div className="flex flex-col md:flex-row md:gap-10">
              <label htmlFor={'repeatEvery'} className="block mb-2 text-md font-medium text-gray-900">
                Every <span className="text-red-500">*</span>
              </label>
              <div>
                <MonthSelector selectedValue={selectedMonth} onChange={(v) => setSelectedMonth(v as MonthKey)} />
              </div>
            </div>
          </div>}

          {formValues.recurrenceType === 'weekly' && <div className="col-span-1 md:col-span-2">
            <div className="flex flex-col md:flex-row md:gap-10">
              <label htmlFor={'repeatEvery'} className="block mb-2 text-md font-medium text-gray-900">
                Repeat on <span className="text-red-500">*</span>
              </label>
              <div>
                <DaySelector selectedDays={formValues.metadata[formValues.recurrenceType].repeatOn || []} toggleDay={toggleDay} />
                {errors['selectedDays' as keyof EventFormValues] && (
                  <p className="text-red-500 text-sm">
                    {errors['selectedDays' as keyof EventFormValues]}
                  </p>
                )}
              </div>
            </div>
          </div>}

          {(formValues.recurrenceType === 'monthly' || formValues.recurrenceType === 'yearly') && <div className="flex place-items-center gap-4">
            <label htmlFor={'repeatEvery'} className="block mb-2 text-md font-medium text-gray-900">
              On <span className="text-red-500">*</span>
            </label>
            <DateOrDaySelector onChange={onRecurrenceDateOrDayChange} />
          </div>}
        </>}
      </div>

      <div className="">
        <button
          type="submit"
          className="w-full xs:col-span-1 sm:col-span-3 md:col-span-3 lg:col-span-3 p-2 bg-linear-to-r from-[#455A64] to-[#546E7A] text-gray-300 rounded-sm hover:bg-[#285a54]"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  )
}
