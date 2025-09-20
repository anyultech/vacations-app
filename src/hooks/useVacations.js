import { useMutation, useQuery } from '@tanstack/react-query';
import { UserVacations, VacationRequestList } from '../data/data';
import { useAppContext } from '../context/AppContext';
import dayjs from 'dayjs';

export function useVacationRequests() {
  const { currentUser } = useAppContext();

  const { data } = useQuery({
    queryKey: ['requests'],
    queryFn: () => {
      throw '';
    },
    initialData: VacationRequestList.filter(
      (item) => item.user === currentUser.username,
    ),
  });

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: async (body) => {},
  });

  return { requests: data, create: mutate };
}

export function useVacationInfo() {
  const { currentUser } = useAppContext();
  const { data } = useQuery({
    queryKey: ['vacationInfo'],
    queryFn: () => {
      throw '';
    },
    initialData: UserVacations.filter(
      (item) => item.user === currentUser.username,
    ),
  });

  const { mutate } = useMutation({
    queryFn: async () => {},
  });

  const [vacationInfo] = data;

  return {
    vacationInfo,
    update: mutate,
  };
}

export function useSendRequest() {
  const { create } = useVacationRequests();
  const { update, vacationInfo } = useVacationInfo();

  async function handleSubmit(e) {
    e.preventDefault();
    const to = dayjs(e.currentTarget.to.value);
    const from = dayjs(e.currentTarget.from.value);
    const observations = e.currentTarget.observations;
    const newRequest = {
      to: to.toISOString(),
      from: from.toISOString(),
      observations,
    };

    //create new request
    await create(newRequest);

    // Get requested days and calculate vacationInfo
    const requestedDays = to.diff(from, 'days');
    const updatedInfo = {
      ...vacationInfo,
      remaining: vacationInfo.remaining - requestedDays,
      pending: vacationInfo.pending - requestedDays,
    };

    //update vacationInfo
    await update(updatedInfo);
  }

  return { handleSubmit };
}
