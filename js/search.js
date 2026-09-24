export function buildSearchIndex(universities, announcements) {
  return announcements.map((announcement) => {
    const university = universities.find((u) => u.id === announcement.universityId);

    return {
      ...announcement,
      universityName: university?.name || '',
      shortName: university?.shortName || '',
      province: university?.province || '',
      faculty: announcement.faculty || '',
      searchText: [
        university?.name || '',
        university?.shortName || '',
        announcement.title,
        announcement.category,
        announcement.faculty || '',
        ...(announcement.keywords || [])
      ]
        .join(' ')
        .toLowerCase(),
    };
  });
}

export function filterAnnouncements(announcements, searchText, activeFilters) {
  const normalizedSearch = searchText.trim().toLowerCase();

  return announcements.filter((item) => {
    const matchesSearch =
      normalizedSearch.length === 0 ||
      item.searchText.includes(normalizedSearch);

    const matchesFilters =
      activeFilters.length === 0 || activeFilters.includes(item.category);

    return matchesSearch && matchesFilters;
  });
}
