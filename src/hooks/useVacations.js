import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { UserVacations, VacationRequestList } from '../data/data';
import { useAppContext } from '../context/AppContext';
import dayjs from 'dayjs';
import * as uuid from 'uuid';

export function useVacationRequests() {
  const { currentUser } = useAppContext();
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ['requests', { user: currentUser.id }],
    queryFn: async () => {
      return VacationRequestList.filter(
        (item) => item.user === currentUser.username,
      );
    },
    initialData: [],
  });

  const { mutate: update } = useMutation({
    mutationFn: async (request) => {
      const target = VacationRequestList.find((item) => item.id === request.id);
      target.state = request.state;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['requests']);
    },
  });

  const { mutate: create } = useMutation({
    mutationFn: async (request) => {
      request.createdAt = dayjs().toISOString();
      request.id = uuid.v4();
      request.state = 'pending';
      VacationRequestList.push(request);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['requests']);
    },
  });

  return { requests: data, create, update };
}

export function useVacationInfo() {
  const { currentUser } = useAppContext();
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ['vacationInfo', { user: currentUser.id }],
    queryFn: () => {
      return UserVacations.filter((item) => item.user === currentUser.username);
    },
    initialData: [{}],
  });

  const { mutate } = useMutation({
    mutationFn: async (updated) => {
      const target = UserVacations.find(
        (item) => item.user === currentUser.username,
      );
      target.approved = updated.approved;
      target.declined = updated.declined;
      target.pending = updated.pending;
      target.remaining = updated.remaining;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['vacationInfo', { user: currentUser.id }],
      });
    },
  });

  const [vacationInfo] = data;

  return {
    vacationInfo,
    update: mutate,
  };
}

export function useSendRequest(clear) {
  const { create } = useVacationRequests();
  const { update, vacationInfo } = useVacationInfo();
  const { currentUser } = useAppContext();

  async function handleSubmit(e) {
    e.preventDefault();
    const to = dayjs(e.currentTarget.to.value);
    const from = dayjs(e.currentTarget.from.value);
    const observations = e.currentTarget.observations;
    const newRequest = {
      to: to.toISOString(),
      from: from.toISOString(),
      observations,
      user: currentUser.username,
    };

    //create new request
    await create(newRequest);

    // Get requested days and calculate vacationInfo
    const requestedDays = to.diff(from, 'days') + 1;
    const updatedInfo = {
      ...vacationInfo,
      remaining: vacationInfo.remaining - requestedDays,
      pending: vacationInfo.pending + requestedDays,
    };

    //update vacationInfo
    await update(updatedInfo);
    clear();
  }

  return { handleSubmit };
}

export function useRequestActions(request) {
  const { update: updateVacationRequest } = useVacationRequests();
  const { update, vacationInfo } = useVacationInfo();

  const requestedDays = dayjs(request.to).diff(dayjs(request.from), 'days') + 1;
  const updatedInfo = {
    ...vacationInfo,
  };

  async function decline() {
    await updateVacationRequest({ ...request, state: 'declined' });
    updatedInfo.declined += requestedDays;
    updatedInfo.pending -= requestedDays;
    updatedInfo.remaining += requestedDays;
    await update(updatedInfo);
  }

  async function approve() {
    await updateVacationRequest({ ...request, state: 'approved' });
    updatedInfo.approved += requestedDays;
    updatedInfo.pending -= requestedDays;
    await update(updatedInfo);
  }

  return {
    decline,
    approve,
  };
}
