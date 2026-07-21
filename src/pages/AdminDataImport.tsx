import { useState } from 'react';
import { FileUp, CheckCircle2, CircleAlert } from 'lucide-react';
import { parseFoodCatalogue, parseMessMenu } from '../services/csvService';
import { validateFoods, validateMenu } from '../services/csvValidation';
import { publishFoodCatalogue, publishMessMenu } from '../services/repositories/foodRepository';
import type { FoodCatalogueItem } from '../types/food';
import type { MessMenuItem } from '../types/menu';

export default function AdminDataImport() {
  const [foods, setFoods] = useState<FoodCatalogueItem[]>([]);
  const [menuItems, setMenuItems] = useState<MessMenuItem[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [message, setMessage] = useState('');
  const [isPublishing, setIsPublishing] = useState(false);

  async function handleFoodUpload(file: File) {
    try {
      const parsedFoods = await parseFoodCatalogue(file);
      const validationErrors = validateFoods(parsedFoods);

      setFoods(parsedFoods);
      setErrors(validationErrors);
      setMessage(
        validationErrors.length
          ? 'Food catalogue has issues. Fix them before publishing.'
          : `${parsedFoods.length} food items are ready.`,
      );
    } catch {
      setErrors(['Could not read the food catalogue file.']);
    }
  }

  async function handleMenuUpload(file: File) {
    if (foods.length === 0) {
      setErrors(['Upload a valid food catalogue before uploading the mess menu.']);
      return;
    }

    try {
      const parsedMenu = await parseMessMenu(file);
      const validationErrors = validateMenu(parsedMenu, foods);

      setMenuItems(parsedMenu);
      setErrors(validationErrors);
      setMessage(
        validationErrors.length
          ? 'Mess menu has issues. Fix them before publishing.'
          : `${parsedMenu.length} menu entries are ready.`,
      );
    } catch {
      setErrors(['Could not read the mess menu file.']);
    }
  }

  const canPublish =
    foods.length > 0 &&
    menuItems.length > 0 &&
    errors.length === 0;

  async function publishData() {
    if (!canPublish) return;
    setIsPublishing(true);
    setErrors([]);
    setMessage('Publishing the catalogue and menu to Firebase…');
    try {
      await publishFoodCatalogue(foods);
      await publishMessMenu(menuItems);
      setMessage(`${foods.length} foods and ${menuItems.length} menu entries are now available in Firebase.`);
    } catch (error) {
      console.error('Could not publish data:', error);
      setErrors(['Publishing failed. Check your Firebase connection, Firestore rules, and administrator access.']);
      setMessage('');
    } finally {
      setIsPublishing(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-slate-900 p-6 text-white">
        <h1 className="text-2xl font-bold">CSV Data Import</h1>
        <p className="mt-1 text-sm text-slate-300">
          Upload the food catalogue first, then the date-wise mess menu.
        </p>
        <p className="mt-3 text-sm text-slate-300">
          Sample files: <a className="font-semibold text-emerald-300 underline" href="/data/food_catalogue.csv" download>food catalogue</a> and <a className="font-semibold text-emerald-300 underline" href="/data/mess_menu.csv" download>mess menu</a>.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <UploadCard
          title="1. Food Catalogue"
          description="Nutrition, cost, source and serving information."
          onFileSelected={handleFoodUpload}
        />

        <UploadCard
          title="2. Mess Menu"
          description="Date-wise breakfast, lunch, snacks and dinner."
          onFileSelected={handleMenuUpload}
        />
      </div>

      {message && (
        <div className="rounded-xl border border-sky-200 bg-sky-50 p-4 text-sm text-sky-900">
          {message}
        </div>
      )}

      {errors.length > 0 && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4">
          <div className="flex items-center gap-2 font-semibold text-red-800">
            <CircleAlert className="h-5 w-5" />
            Fix these issues
          </div>

          <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-red-700">
            {errors.slice(0, 10).map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      {foods.length > 0 && errors.length === 0 && (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800">
          <div className="flex items-center gap-2 font-semibold">
            <CheckCircle2 className="h-5 w-5" />
            Food catalogue preview: {foods.length} items
          </div>

          <p className="mt-2">
            Example: {foods.slice(0, 3).map((food) => food.foodName).join(', ')}
          </p>
        </div>
      )}

      <button
        type="button"
        onClick={() => void publishData()}
        disabled={!canPublish || isPublishing}
        className="rounded-lg bg-emerald-600 px-5 py-2.5 font-semibold text-white disabled:cursor-not-allowed disabled:bg-slate-300"
      >
        {isPublishing ? 'Publishing…' : 'Publish data to Firebase'}
      </button>

      {!canPublish && (
        <p className="text-sm text-slate-500">
          The publish button will activate after both CSV files are valid.
        </p>
      )}
    </div>
  );
}

function UploadCard({
  title,
  description,
  onFileSelected,
}: {
  title: string;
  description: string;
  onFileSelected: (file: File) => void;
}) {
  return (
    <label className="cursor-pointer rounded-2xl border-2 border-dashed border-slate-300 bg-white p-6 transition hover:border-emerald-500">
      <FileUp className="h-8 w-8 text-emerald-600" />
      <h2 className="mt-4 text-lg font-bold text-slate-800">{title}</h2>
      <p className="mt-1 text-sm text-slate-500">{description}</p>

      <span className="mt-5 inline-block rounded-lg bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700">
        Choose CSV
      </span>

      <input
        type="file"
        accept=".csv,text/csv"
        className="hidden"
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (file) onFileSelected(file);
        }}
      />
    </label>
  );
}
